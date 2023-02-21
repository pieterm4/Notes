using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.Services.Identity;

namespace MyNotes.Application.Implementation.Features.Authentication.Login.Commands;

public class LoginCommandHandler : IRequestHandler<LoginCommand, LoginCommandResponse>
{
    private readonly IAuthenticationService _authenticationService;
    private readonly IMapper _mapper;

    public LoginCommandHandler(
        IAuthenticationService authenticationService,
        IMapper mapper)
    {
        _authenticationService = authenticationService;
        _mapper = mapper;
    }
    public async Task<LoginCommandResponse> Handle(LoginCommand request, CancellationToken cancellationToken)
    {
        var response = new LoginCommandResponse();
        var validator = new LoginCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            response.Success = false;
            response.AddErrors(validationResult.Errors.Select(x => x.ErrorMessage));

            return response;
        }

        var authenticationResult = await _authenticationService.AuthenticateAsync(request.Email, request.Password);
        if (authenticationResult.Success)
        {
            response.Success = true;
            response.LoginResponseDto = new LoginResponseDto
            {
                UserId = authenticationResult.UserId,
                Email = authenticationResult.Email,
                Token = authenticationResult.Token
            };

            return response;
        }

        
        response.Success = false;
        response.AddErrors(authenticationResult.ErrorMessages.ToList());

        return response;
    }
}