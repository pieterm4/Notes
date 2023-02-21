using MediatR;
using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Update;

public class UpdateNoteCommand : IRequest<BaseResponse>
{
    public Guid Id { get; set; }
    public string Title { get; set; } = null!;
    public string Content { get; set; } = null!;
}