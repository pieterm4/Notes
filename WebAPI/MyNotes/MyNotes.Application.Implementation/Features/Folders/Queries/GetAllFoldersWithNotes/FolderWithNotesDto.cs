using MyNotes.Application.Implementation.Features.Notes.Queries;

namespace MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFoldersWithNotes;

public class FolderWithNotesDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public List<NoteDto> Notes { get; set; } = new();
}