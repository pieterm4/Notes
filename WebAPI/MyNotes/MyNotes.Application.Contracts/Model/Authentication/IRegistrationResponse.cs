namespace MyNotes.Application.Contracts.Model.Authentication;

public interface IRegistrationResponse
{
    string UserId { get; }
    bool Success { get; set; }
    IEnumerable<string> ErrorMessages { get; }
}