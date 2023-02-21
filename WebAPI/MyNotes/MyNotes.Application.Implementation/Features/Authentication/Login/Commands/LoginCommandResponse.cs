using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Authentication.Login.Commands;

public class LoginCommandResponse : BaseResponse
{
    public LoginCommandResponse()
    {
    }
    
    public LoginCommandResponse(string userId, string email, string token)
    {
        LoginResponseDto = new LoginResponseDto
        {
            UserId = userId,
            Email = email,
            Token = token
        };
    }
    public LoginResponseDto LoginResponseDto { get; set; } = null!;
}