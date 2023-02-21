using System.Reflection;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MyNotes.Application.Contracts.Services;
using MyNotes.Domain.Model;

namespace MyNotes.DataAccessLayer.Context;

public class ApplicationDbContext : DbContext
{
    private readonly ILoggedInUserService? _loggedInUserService;

    public ApplicationDbContext()
    {
    }

    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> context) : base(context)
    {
    }
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> context, ILoggedInUserService loggedInUserService) : base(context)
    {
        _loggedInUserService = loggedInUserService;
    }
    
    public DbSet<Note> Notes => Set<Note>();
    public DbSet<Folder> Folders => Set<Folder>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
    }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<AuditableEntity>())
        {
            SetAuditableEntityProperties(entry);
        }
        
        return base.SaveChangesAsync(cancellationToken);
    }

    private void SetAuditableEntityProperties(EntityEntry<AuditableEntity> entry)
    {
        switch (entry.State)
        {
            case EntityState.Added:
                entry.Entity.CreatedBy = _loggedInUserService?.UserId;
                entry.Entity.CreatedDay = DateTime.Now;
                break;
            case EntityState.Modified:
                entry.Entity.LastModifiedBy = _loggedInUserService?.UserId;
                entry.Entity.LastModifiedDay = DateTime.Now;
                break;
        }
    }
}