namespace MyNotes.Application.Implementation.Responses;

public class BaseResponse
{
    private readonly List<string> _validationErrors = new();
    protected BaseResponse()
    {
        Success = true;
    }

    public BaseResponse(string message = null!)
    {
        Success = true;
    }

    protected BaseResponse(bool success, string message)
    {
        Success = success;
    }
    
    public bool Success { get; set; }

    public IEnumerable<string> ValidationErrors => _validationErrors;

    public void AddError(string error)
    {
        _validationErrors.Add(error);
    }

    public void AddErrors(IEnumerable<string> errors)
    {
        _validationErrors.AddRange(errors);
    }
}