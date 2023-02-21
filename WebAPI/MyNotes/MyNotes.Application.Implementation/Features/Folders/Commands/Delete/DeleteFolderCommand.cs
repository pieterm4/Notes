using MediatR;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Delete;

public class DeleteFolderCommand : IRequest<DeleteFolderResponse>
{
    public DeleteFolderCommand(Guid folderId)
    {
        FolderId = folderId;
    }

    public Guid FolderId { get; }
}