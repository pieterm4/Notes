namespace MyNotes.Application.Implementation.Features.Notes.Queries;

public class NoteDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
    public string Content { get; set; } = string.Empty;
    public DateTime CreatedDay { get; set; }
    public Guid FolderId { get; set; }
}