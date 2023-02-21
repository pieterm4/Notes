using MediatR;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Delete;

public class DeleteNoteCommand : IRequest<DeleteNoteResponse>
{
    public Guid Id { get; set; }
}