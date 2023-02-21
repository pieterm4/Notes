namespace MyNotes.Application.Contracts.Model.Authentication;

public interface IAuthenticationResponse
{
    string UserId { get; }
    string Email { get; }
    string Token { get; }
    bool Success { get; }
    
    IEnumerable<string> ErrorMessages { get; }
}