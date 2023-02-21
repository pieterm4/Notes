using MediatR;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Create;

public class CreateNoteCommand : IRequest<CreateNoteCommandResponse>
{
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
    public Guid FolderId { get; set; }
}