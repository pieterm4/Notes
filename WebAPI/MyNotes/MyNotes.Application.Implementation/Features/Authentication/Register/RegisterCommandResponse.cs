using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Authentication.Register;

public class RegisterCommandResponse : BaseResponse
{
    public string UserId { get; set; } = null!;
}