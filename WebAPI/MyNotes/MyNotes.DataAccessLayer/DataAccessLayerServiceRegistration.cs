using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.DataAccessLayer.Context;
using MyNotes.DataAccessLayer.Repository;

namespace MyNotes.DataAccessLayer;

public static class DataAccessLayerServiceRegistration
{
    public static void AddDataAccessLayerServices(this WebApplicationBuilder builder)
    {
        var connectionString = builder.Configuration.GetConnectionString("LocalhostDbConnection") ?? throw new ArgumentException("Connection string does not exist");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
            options.UseSqlServer(connectionString));

        builder.Services.AddScoped(typeof(IAsyncRepository<>), typeof(BaseRepository<>));
        builder.Services.AddScoped<IFolderRepository, FolderRepository>();
        builder.Services.AddScoped<INoteRepository, NoteRepository>();
    }
}