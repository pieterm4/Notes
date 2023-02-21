using FluentValidation;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Create;

internal class CreateFolderCommandValidator : AbstractValidator<CreateFolderCommand>
{
    public CreateFolderCommandValidator()
    {
        RuleFor(x => x.Title)
            .NotEmpty()
            .WithMessage("{PropertyTitle} is required")
            .MaximumLength(255)
            .WithMessage("{PropertyTitle} must not exceed 255 characters");
    }
}