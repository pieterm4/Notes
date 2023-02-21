using Microsoft.EntityFrameworkCore;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.DataAccessLayer.Context;
using MyNotes.Domain.Model;

namespace MyNotes.DataAccessLayer.Repository;

public class NoteRepository : BaseRepository<Note>, INoteRepository
{
    public NoteRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<IEnumerable<Note>> GetNotesByFolderId(Guid folderId)
    {
        return await DbSet.Where(x => x.FolderId == folderId).ToListAsync();
    }
}