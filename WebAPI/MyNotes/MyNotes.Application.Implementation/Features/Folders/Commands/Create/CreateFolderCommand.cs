using MediatR;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Create;

public class CreateFolderCommand : IRequest<CreateFolderCommandResponse>
{
    public string Title { get; set; } = null!;
}