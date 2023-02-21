using AutoMapper;
using MyNotes.Application.Implementation.Features.Folders.Commands.Create;
using MyNotes.Application.Implementation.Features.Folders.Commands.Delete;
using MyNotes.Application.Implementation.Features.Folders.Commands.Update;
using MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFolders;
using MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFoldersWithNotes;
using MyNotes.Application.Implementation.Features.Notes.Commands.Create;
using MyNotes.Application.Implementation.Features.Notes.Commands.Update;
using MyNotes.Application.Implementation.Features.Notes.Queries;
using MyNotes.Domain.Model;

namespace MyNotes.Application.Implementation.Profiles;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Folder, CreateFolderCommand>().ReverseMap();
        CreateMap<Folder, CreateFolderDto>().DisableCtorValidation().ReverseMap();
        CreateMap<Folder, UpdateFolderCommand>().ReverseMap();
        CreateMap<Folder, DeleteFolderCommand>().ReverseMap();
        CreateMap<Folder, FolderDto>().DisableCtorValidation();
        CreateMap<Folder, FolderWithNotesDto>();
        
        CreateMap<Note, CreateNoteCommand>().ReverseMap();
        CreateMap<Note, UpdateNoteCommand>().ReverseMap();
        CreateMap<Note, NoteDto>();
        CreateMap<Note, CreateNoteDto>().DisableCtorValidation().ReverseMap();
    }
}