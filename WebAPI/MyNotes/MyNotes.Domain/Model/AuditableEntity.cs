namespace MyNotes.Domain.Model;

public class AuditableEntity
{
    public Guid Id { get; set; }

    public string CreatedBy { get; set; }

    public DateTime CreatedDay { get; set; }

    public string LastModifiedBy { get; set; }

    public DateTime LastModifiedDay { get; set; }
}