using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;

namespace MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFoldersWithNotes;

public class GetAllFoldersWithNotesQueryHandler : IRequestHandler<GetAllFoldersWithNotesQuery, List<FolderWithNotesDto>>
{
    private readonly IMapper _mapper;
    private readonly IFolderRepository _folderRepository;

    public GetAllFoldersWithNotesQueryHandler(IMapper mapper, IFolderRepository folderRepository)
    {
        _mapper = mapper;
        _folderRepository = folderRepository;
    }

    public async Task<List<FolderWithNotesDto>> Handle(GetAllFoldersWithNotesQuery request, CancellationToken cancellationToken)
    {
        var foldersWithNotes = (await _folderRepository.GetFoldersWithNotes()).OrderBy(x => x.CreatedDay);

        var result = _mapper.Map<List<FolderWithNotesDto>>(foldersWithNotes);

        return result;
    }
}