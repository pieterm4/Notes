using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Delete;

public class DeleteFolderCommandHandler : IRequestHandler<DeleteFolderCommand, DeleteFolderResponse>
{
    private readonly IFolderRepository _folderRepository;

    public DeleteFolderCommandHandler(IFolderRepository folderRepository)
    {
        _folderRepository = folderRepository;
    }
    
    public async Task<DeleteFolderResponse> Handle(DeleteFolderCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await _folderRepository.GetByIdAsync(request.FolderId);
        if (itemToDelete is null)
        {
            return new DeleteFolderResponse(false, $"Folder with id {request.FolderId} was not found");
        }

        await _folderRepository.DeleteAsync(itemToDelete);
        return new DeleteFolderResponse(true, string.Empty);
    }
}