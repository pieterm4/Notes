using Microsoft.AspNetCore.Identity;
using MyNotes.Application.Contracts.Model.Authentication;
using MyNotes.Application.Contracts.Services.Identity;
using MyNotes.Identity.Model;

namespace MyNotes.Identity.Services;

public class AuthenticationService : IAuthenticationService
{
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;
    private readonly IIdentityTokenClaimService _identityTokenClaimService;

    public AuthenticationService(
        UserManager<ApplicationUser> userManager,
        SignInManager<ApplicationUser> signInManager,
        IIdentityTokenClaimService identityTokenClaimService)
    {
        _userManager = userManager;
        _signInManager = signInManager;
        _identityTokenClaimService = identityTokenClaimService;
    }

    public async Task<IAuthenticationResponse> AuthenticateAsync(string email, string password)
    {
        var response = new AuthenticationResponse { Success = false };
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is null)
        {
            response.AddError("Email address or password is incorrect");
            return response;
        }

        var signInResult = await _signInManager.CheckPasswordSignInAsync(
            existingUser,
            password,
            false);
        if (!signInResult.Succeeded)
        {
            response.AddError("Email address or password is incorrect");
            return response;
        }

        var securityToken = await _identityTokenClaimService.GetTokenAsync(existingUser);
        response.Email = existingUser.Email;
        response.UserId = existingUser.Id;
        response.Success = true;
        response.Token = securityToken;

        return response;
    }

    public async Task<IRegistrationResponse> RegisterAsync(string email, string password)
    {
        var response = new RegistrationResponse();
        var existingUser = await _userManager.FindByEmailAsync(email);
        if (existingUser is not null)
        {
            response.Success = false;
            response.AddErrorMessage($"User with email {email} already exists");

            return response;
        }

        var newUser = new ApplicationUser
        {
            Email = email,
            UserName = email
        };

        var result = await _userManager.CreateAsync(newUser, password);
        if (result.Succeeded)
        {
            response.Success = true;
            response.UserId = newUser.Id;

            return response;
        }

        response.Success = false;
        response.AddErrorMessages(result.Errors.Select(x => $"Code: '{x.Code}' - Description: {x.Description}"));

        return response;
    }
}