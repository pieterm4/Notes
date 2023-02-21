using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using MyNotes.Domain.Model;

namespace MyNotes.DataAccessLayer.Configuration;

public class NotesConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder
            .ToTable("Notes");
        builder
            .HasKey(x => x.Id);
        builder
            .Property(x => x.Title)
            .HasMaxLength(255)
            .IsRequired();
        builder
            .HasIndex(x => x.CreatedBy);
        builder
            .HasIndex(x => x.FolderId);
    }
}