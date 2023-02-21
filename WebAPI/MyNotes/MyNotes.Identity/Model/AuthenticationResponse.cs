using MyNotes.Application.Contracts.Model.Authentication;

namespace MyNotes.Identity.Model;

public class AuthenticationResponse : IAuthenticationResponse
{
    private readonly List<string> _errors = new List<string>();
    public string UserId { get; set; } = null!;
    public string Email { get; set; } = null!;
    public string Token { get; set; } = null!;
    public bool Success { get; set; }

    public IEnumerable<string> ErrorMessages => _errors;

    public void AddError(string error) => _errors.Add(error);
}