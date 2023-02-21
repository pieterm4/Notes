using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Create;

public class CreateNoteCommandResponse : BaseResponse
{
    public CreateNoteDto Note { get; set; } = null!;
}