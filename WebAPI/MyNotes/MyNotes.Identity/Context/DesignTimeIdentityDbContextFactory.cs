using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;

namespace MyNotes.Identity.Context;

public class DesignTimeIdentityDbContextFactory : IDesignTimeDbContextFactory<AppIdentityDbContext>
{
    public AppIdentityDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<AppIdentityDbContext>();
        var configuration = new ConfigurationBuilder().SetBasePath(Directory.GetCurrentDirectory()).AddJsonFile(@Directory.GetCurrentDirectory() + "../../MyNotes/appsettings.json").Build();
        var connectionString = configuration.GetConnectionString("IdentityDbConnection");
        optionsBuilder.UseSqlServer(connectionString);

        return new AppIdentityDbContext(optionsBuilder.Options);
    }
}