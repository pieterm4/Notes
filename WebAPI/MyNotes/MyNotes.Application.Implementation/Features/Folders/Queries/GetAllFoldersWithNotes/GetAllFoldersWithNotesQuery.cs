using MediatR;

namespace MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFoldersWithNotes;

public class GetAllFoldersWithNotesQuery : IRequest<List<FolderWithNotesDto>>
{
}