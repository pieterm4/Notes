using MyNotes.Domain.Model;

namespace MyNotes.Application.Contracts.DataAccessLayer.Repository;

public interface IFolderRepository : IAsyncRepository<Folder>
{
    Task<Folder?> GetFolderByIdWithNotes(Guid folderId);

    Task<IEnumerable<Folder>> GetFoldersWithNotes();
}