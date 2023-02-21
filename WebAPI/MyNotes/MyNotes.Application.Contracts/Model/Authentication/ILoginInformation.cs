namespace MyNotes.Application.Contracts.Model.Authentication;

public interface ILoginInformation
{
    string Email { get; set; }
    string Password { get; set; }
}