using MediatR;

namespace MyNotes.Application.Implementation.Features.Authentication.Register;

public class RegisterCommand : IRequest<RegisterCommandResponse>
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string ConfirmPassword { get; set; } = null!;
}