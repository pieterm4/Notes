namespace MyNotes.Application.Contracts.Services;

public interface ILoggedInUserService
{
    string? UserId { get; set; }
}