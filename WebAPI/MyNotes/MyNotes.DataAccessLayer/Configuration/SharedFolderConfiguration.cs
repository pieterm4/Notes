using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyNotes.Domain.Model;

namespace MyNotes.DataAccessLayer.Configuration;

public class SharedFolderConfiguration : IEntityTypeConfiguration<SharedFolder>
{
    public void Configure(EntityTypeBuilder<SharedFolder> builder)
    {
        builder
            .ToTable("SharedFolders");
        builder
            .HasKey(x => x.Id);
        builder
            .HasOne(x => x.Folder);
    }
}