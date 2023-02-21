using MyNotes.Application.Contracts.Model.Authentication;

namespace MyNotes.Application.Implementation.Model.Authentication;

public class LoginInformation : ILoginInformation
{
    public string Email { get; set; } = null!;
    public string Password { get; set; } = null!;
}