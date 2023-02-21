namespace MyNotes.Domain.Model;

public class SharedFolder : AuditableEntity
{
    public string UserId { get; set; }
    public Guid FolderId { get; set; }
    public Folder Folder { get; set; }
}