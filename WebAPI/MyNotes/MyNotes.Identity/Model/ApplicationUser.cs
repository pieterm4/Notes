using Microsoft.AspNetCore.Identity;
using MyNotes.Application.Contracts.Model.Authentication;

namespace MyNotes.Identity.Model;

public class ApplicationUser : IdentityUser, IApplicationUser
{
}