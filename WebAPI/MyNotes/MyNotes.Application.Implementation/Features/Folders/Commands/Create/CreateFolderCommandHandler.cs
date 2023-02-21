using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.Domain.Model;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Create;

public class CreateFolderCommandHandler : IRequestHandler<CreateFolderCommand, CreateFolderCommandResponse>
{
    private readonly IMapper _mapper;
    private readonly IFolderRepository _folderRepository;

    public CreateFolderCommandHandler(IMapper mapper, IFolderRepository folderRepository)
    {
        _mapper = mapper;
        _folderRepository = folderRepository;
    }
    public async Task<CreateFolderCommandResponse> Handle(CreateFolderCommand request, CancellationToken cancellationToken)
    {
        var response = new CreateFolderCommandResponse();
        var validator = new CreateFolderCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);

        if (!validationResult.IsValid)
        {
            response.Success = false;
            var errorMessages = validationResult.Errors.Select(x => x.ErrorMessage);
            response.AddErrors(errorMessages);

            return response;
        }

        var folder = new Folder { Title = request.Title };
        await _folderRepository.AddAsync(folder);
        response.Folder = _mapper.Map<CreateFolderDto>(folder);

        return response;
    }
}