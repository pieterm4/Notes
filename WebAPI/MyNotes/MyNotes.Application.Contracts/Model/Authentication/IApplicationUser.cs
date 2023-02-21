namespace MyNotes.Application.Contracts.Model.Authentication;

public interface IApplicationUser
{
    string Id { get; }
    string Email { get; }
}