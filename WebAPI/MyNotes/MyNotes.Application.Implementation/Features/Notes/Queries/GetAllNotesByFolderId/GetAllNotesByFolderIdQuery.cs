using MediatR;

namespace MyNotes.Application.Implementation.Features.Notes.Queries.GetAllNotesByFolderId;

public class GetAllNotesByFolderIdQuery : IRequest<List<NoteDto>>
{
    public Guid FolderId { get; set; }
}