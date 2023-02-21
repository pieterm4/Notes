using FluentValidation;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Update;

internal class UpdateFolderCommandValidator : AbstractValidator<UpdateFolderCommand>
{
    public UpdateFolderCommandValidator()
    {
        RuleFor(x => x.Title)
            .MaximumLength(255)
            .WithMessage("{PropertyName} must not exceed 255 characters");
    }
}