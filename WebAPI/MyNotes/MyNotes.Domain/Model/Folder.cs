namespace MyNotes.Domain.Model;

public class Folder : AuditableEntity
{
    public string Title { get; set; }
    public List<Note> Notes { get; set; }
}