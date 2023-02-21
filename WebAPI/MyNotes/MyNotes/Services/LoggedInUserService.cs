using System.Security.Claims;
using MyNotes.Application.Contracts.Services;

namespace MyNotes.Services;

internal class LoggedInUserService : ILoggedInUserService
{
    public LoggedInUserService(IHttpContextAccessor httpContextAccessor)
    {
        UserId = httpContextAccessor?.HttpContext?.User?.FindFirstValue(ClaimTypes.NameIdentifier);
    }

    public string? UserId { get; set; }
}