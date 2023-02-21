using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MyNotes.DataAccessLayer.Context;

public class DesignTimeDbContextFactory : IDesignTimeDbContextFactory<ApplicationDbContext>
{
    public ApplicationDbContext CreateDbContext(string[] args)
    {
        var configuration = new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile(@Directory.GetCurrentDirectory() + "../../MyNotes/appsettings.json")
            .Build(); 
        var builder = new DbContextOptionsBuilder<ApplicationDbContext>(); 
        var connectionString = configuration.GetConnectionString("LocalhostDbConnection"); 
        builder.UseSqlServer(connectionString);
        
        return new ApplicationDbContext(builder.Options);
    }
}