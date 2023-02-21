using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyNotes.Domain.Model;

namespace MyNotes.DataAccessLayer.Configuration;

public class FoldersConfiguration : IEntityTypeConfiguration<Folder>
{
    public void Configure(EntityTypeBuilder<Folder> builder)
    {
        builder
            .ToTable("Folders");
        builder
            .HasKey(x => x.Id);
        builder
            .Property(x => x.Title)
            .IsRequired()
            .HasMaxLength(255);
        builder
            .HasMany(x => x.Notes);
        builder.HasIndex(x => x.CreatedBy);
    }
}