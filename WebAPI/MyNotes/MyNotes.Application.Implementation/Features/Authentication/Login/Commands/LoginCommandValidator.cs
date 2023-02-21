using FluentValidation;

namespace MyNotes.Application.Implementation.Features.Authentication.Login.Commands;

public class LoginCommandValidator : AbstractValidator<LoginCommand>
{
    public LoginCommandValidator()
    {
        RuleFor(x => x.Email)
            .EmailAddress()
            .WithMessage("Invalid email address")
            .NotEmpty()
            .WithMessage("Email address is empty");
        RuleFor(x => x.Password)
            .NotEmpty()
            .WithMessage("{PropertyName} is empty");

    }
}