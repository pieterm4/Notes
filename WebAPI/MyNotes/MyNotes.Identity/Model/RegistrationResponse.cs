using MyNotes.Application.Contracts.Model.Authentication;

namespace MyNotes.Identity.Model;

public class RegistrationResponse : IRegistrationResponse
{
    private readonly List<string> _errorMessages = new();
    public string UserId { get; set; } = null!;

    public bool Success { get; set; }

    public IEnumerable<string> ErrorMessages => _errorMessages;

    public void AddErrorMessage(string errorMessage)
    {
        _errorMessages.Add(errorMessage);
    }

    public void AddErrorMessages(IEnumerable<string> errorMessages)
    {
        _errorMessages.AddRange(errorMessages);
    }
}