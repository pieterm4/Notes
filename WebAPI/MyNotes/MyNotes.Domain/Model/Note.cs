namespace MyNotes.Domain.Model;

public class Note : AuditableEntity
{
    public string Title { get; set; }

    public string Content { get; set; }

    public Guid FolderId { get; set; }

    public Folder Folder { get; set; }
}