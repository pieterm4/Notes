namespace MyNotes.Application.Contracts.DataAccessLayer.Repository;

public interface IAsyncRepository<T> where T : class
{
    Task<T?> GetByIdAsync(Guid entityId);
    Task<IReadOnlyList<T>> ListAllAsync();
    Task<T> AddAsync(T entity);
    Task UpdateAsync(T entity);
    Task DeleteAsync(T entity);
    Task<IReadOnlyList<T>> GetPagedResponseAsync(int page, int size);
    Task<int> CountAsync();
    Task<IEnumerable<T>> Get(Func<T, bool> predicate);
}