using MediatR;
using MyNotes.Application.Contracts.Services.Identity;

namespace MyNotes.Application.Implementation.Features.Authentication.Register;

public class RegisterCommandHandler : IRequestHandler<RegisterCommand, RegisterCommandResponse>
{
    private readonly IAuthenticationService _authenticationService;

    public RegisterCommandHandler(IAuthenticationService authenticationService)
    {
        _authenticationService = authenticationService;
    }
    public async Task<RegisterCommandResponse> Handle(RegisterCommand request, CancellationToken cancellationToken)
    {
        var response = new RegisterCommandResponse();
        var validator = new RegisterCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            response.Success = false;
            response.AddErrors(validationResult.Errors.Select(x => x.ErrorMessage));

            return response;
        }

        var registrationResult = await _authenticationService.RegisterAsync(request.Email, request.Password);
        if (!registrationResult.Success)
        {
            response.Success = false;
            response.AddErrors(registrationResult.ErrorMessages);

            return response;
        }

        response.Success = true;
        response.UserId = registrationResult.UserId;

        return response;
    }
}