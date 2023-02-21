using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Delete;

public class DeleteNoteResponse : BaseResponse
{
    public DeleteNoteResponse(bool success, string message, Guid id) : base(success, message)
    {
        Id = id;
    }

    public Guid Id { get; }
}