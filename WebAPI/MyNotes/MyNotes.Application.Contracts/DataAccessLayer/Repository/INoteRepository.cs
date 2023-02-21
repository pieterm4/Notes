using MyNotes.Domain.Model;

namespace MyNotes.Application.Contracts.DataAccessLayer.Repository;

public interface INoteRepository : IAsyncRepository<Note>
{
    Task<IEnumerable<Note>> GetNotesByFolderId(Guid folderId);
}