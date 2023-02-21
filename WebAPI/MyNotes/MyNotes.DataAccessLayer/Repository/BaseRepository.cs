using Microsoft.EntityFrameworkCore;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.DataAccessLayer.Context;

namespace MyNotes.DataAccessLayer.Repository;

public class BaseRepository<T> : IAsyncRepository<T> where T : class
{
    private readonly ApplicationDbContext _context;
    protected readonly DbSet<T> DbSet;

    public BaseRepository(ApplicationDbContext context)
    {
        _context = context;
        DbSet = context.Set<T>();
    }
    public async Task<T?> GetByIdAsync(Guid entityId)
    {
        return await DbSet.FindAsync(entityId);
    }

    public async Task<IEnumerable<T>> Get(Func<T, bool> predicate)
    {
       var result = DbSet.Where(predicate);

       return await Task.FromResult(result);
    }

    public async Task<IReadOnlyList<T>> ListAllAsync()
    {
        return await DbSet.ToListAsync();
    }

    public async Task<T> AddAsync(T entity)
    {
        await DbSet.AddAsync(entity);
        await SaveChangesAsync();

        return entity;
    }

    public async Task UpdateAsync(T entity)
    {
        _context.Entry(entity).State = EntityState.Modified;
        await SaveChangesAsync();
    }

    public async Task DeleteAsync(T entity)
    {
        DbSet.Remove(entity);
        await SaveChangesAsync();
    }

    public async Task<IReadOnlyList<T>> GetPagedResponseAsync(int page, int size)
    {
        return await DbSet.Skip((page - 1) * size).Take(size).AsNoTracking().ToListAsync();
    }

    public async Task<int> CountAsync()
    {
        return await DbSet.CountAsync();
    }

    private async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}