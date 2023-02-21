using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using MyNotes.Application.Contracts.Model.Authentication;
using MyNotes.Application.Contracts.Services.Identity;
using MyNotes.Identity.Model;

namespace MyNotes.Identity.Services;

public class IdentityTokenClaimService : IIdentityTokenClaimService
{
    private readonly UserManager<ApplicationUser> _userManager;

    public IdentityTokenClaimService(UserManager<ApplicationUser> userManager)
    {
        _userManager = userManager;
    }
    
    public async Task<string> GetTokenAsync(IApplicationUser user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var securityKey = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY")
                                                  ?? throw new ArgumentNullException());
        var roles = await _userManager.GetRolesAsync((ApplicationUser)user);
        var claims = new List<Claim>
        {
            new(ClaimTypes.Email, user.Email),
            new(ClaimTypes.Name, user.Email),
            new(ClaimTypes.NameIdentifier, user.Id)
        };
        claims.AddRange(roles.Select(role => new Claim(ClaimTypes.Role, role)));

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims.ToArray()),
            Expires = DateTime.UtcNow.AddMinutes(30),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(securityKey),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);

        return tokenHandler.WriteToken(token);
    }
}