using MediatR;

namespace MyNotes.Application.Implementation.Features.Notes.Queries.GetAllNotes;

public class GetAllNotesQuery : IRequest<List<NoteDto>>
{
}