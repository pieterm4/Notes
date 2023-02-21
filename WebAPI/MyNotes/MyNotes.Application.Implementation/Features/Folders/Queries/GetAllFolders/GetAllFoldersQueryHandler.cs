using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.Application.Contracts.Services;

namespace MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFolders;

public class GetAllFoldersQueryHandler : IRequestHandler<GetAllFoldersQuery, List<FolderDto>>
{
    private readonly IMapper _mapper;
    private readonly IFolderRepository _folderRepository;
    private readonly ILoggedInUserService _loggedInUserService;

    public GetAllFoldersQueryHandler(IMapper mapper, IFolderRepository folderRepository, ILoggedInUserService loggedInUserService)
    {
        _mapper = mapper;
        _folderRepository = folderRepository;
        _loggedInUserService = loggedInUserService;
    }
    
    public async Task<List<FolderDto>> Handle(GetAllFoldersQuery request, CancellationToken cancellationToken)
    {
        var foldersForLoggedInUser = await _folderRepository.Get(x => x.CreatedBy == _loggedInUserService.UserId);
        var orderedFolders = foldersForLoggedInUser.OrderBy(x => x.CreatedDay);
        
        return _mapper.Map<List<FolderDto>>(orderedFolders);
    }
}