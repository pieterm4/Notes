using FluentValidation;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Update;

public class UpdateNoteCommandValidator : AbstractValidator<UpdateNoteCommand>
{
    public UpdateNoteCommandValidator()
    {
        RuleFor(x => x.Title)
            .MaximumLength(255)
            .WithMessage("{PropertyName} must not exceed 255 characters");
    }
}