using MyNotes.Application.Contracts.Model.Authentication;

namespace MyNotes.Application.Contracts.Services.Identity;

public interface IAuthenticationService
{
    Task<IAuthenticationResponse> AuthenticateAsync(string email, string password);
    Task<IRegistrationResponse> RegisterAsync(string email, string password);
}