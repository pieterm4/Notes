using FluentValidation;

namespace MyNotes.Application.Implementation.Features.Authentication.Register;

public class RegisterCommandValidator : AbstractValidator<RegisterCommand>
{
    public RegisterCommandValidator()
    {
        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("'{PropertyName}' is empty")
            .EmailAddress()
            .WithMessage("'{PropertyName}' has incorrect format");
        RuleFor(x => x.Password)
            .NotEmpty().WithMessage("'PropertyName' is empty")
            .Matches("[A-Z]").WithMessage("'{PropertyName}' must contain one or more capital letters.")
            .Matches("[a-z]").WithMessage("'{PropertyName}' must contain one or more lowercase letters.")
            .Matches(@"\d").WithMessage("'{PropertyName}' must contain one or more digits.")
            .Matches(@"[][""!@$%^&*(){}:;<>,.?/+_=|'~\\-]")
            .WithMessage("'{ PropertyName}' must contain one or more special characters.")
            .Matches("^[^£# “”]*$")
            .WithMessage("'{PropertyName}' must not contain the following characters £ # “” or spaces.")
            .Equal(x => x.ConfirmPassword)
            .WithMessage("Password and confirmation password don't match");
    }
}