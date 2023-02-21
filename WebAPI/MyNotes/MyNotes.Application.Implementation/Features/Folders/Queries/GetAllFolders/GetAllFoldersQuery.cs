using MediatR;

namespace MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFolders;

public class GetAllFoldersQuery : IRequest<List<FolderDto>>
{
}