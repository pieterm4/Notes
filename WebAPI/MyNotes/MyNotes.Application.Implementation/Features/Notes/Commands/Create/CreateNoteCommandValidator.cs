using FluentValidation;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Create;

public class CreateNoteCommandValidator : AbstractValidator<CreateNoteCommand>
{
    public CreateNoteCommandValidator()
    {
        RuleFor(x => x.Title)
            .MaximumLength(255)
            .WithMessage("{PropertyTitle} must not exceed 255 characters");
    }
}