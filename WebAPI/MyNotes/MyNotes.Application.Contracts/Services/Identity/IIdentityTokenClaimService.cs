using MyNotes.Application.Contracts.Model.Authentication;

namespace MyNotes.Application.Contracts.Services.Identity;

public interface IIdentityTokenClaimService
{
    Task<string> GetTokenAsync(IApplicationUser user);
}