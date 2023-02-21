using Microsoft.EntityFrameworkCore;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.DataAccessLayer.Context;
using MyNotes.Domain.Model;

namespace MyNotes.DataAccessLayer.Repository;

public class FolderRepository : BaseRepository<Folder>, IFolderRepository
{
    public FolderRepository(ApplicationDbContext context) : base(context)
    {
    }

    public async Task<Folder?> GetFolderByIdWithNotes(Guid folderId)
    {
        return await DbSet
            .Include(x => x.Notes)
            .FirstOrDefaultAsync(x => x.Id == folderId);
    }

    public async Task<IEnumerable<Folder>> GetFoldersWithNotes()
    {
        return await DbSet
            .Include(x => x.Notes)
            .ToListAsync();
    }
}