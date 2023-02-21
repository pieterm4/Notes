namespace MyNotes.Application.Implementation.Features.Authentication.Login.Commands;

public class LoginResponseDto
{
    public string UserId { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Token { get; set; } = null!;
}