using MediatR;

namespace MyNotes.Application.Implementation.Features.Authentication.Login.Commands;

public class LoginCommand : IRequest<LoginCommandResponse>
{
    public string Email { get; set; } = null!;

    public string Password { get; set; } = null!;
}