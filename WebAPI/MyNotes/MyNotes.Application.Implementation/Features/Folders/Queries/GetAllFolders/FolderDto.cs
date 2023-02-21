namespace MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFolders;

public class FolderDto
{
    public Guid Id { get; set; }
    public string Title { get; set; } = string.Empty;
}