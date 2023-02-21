namespace MyNotes.Application.Implementation.Features.Notes.Commands.Create;

public record CreateNoteDto(
    Guid Id,
    string Title,
    string Content,
    DateTime CreatedDay,
    Guid FolderId);