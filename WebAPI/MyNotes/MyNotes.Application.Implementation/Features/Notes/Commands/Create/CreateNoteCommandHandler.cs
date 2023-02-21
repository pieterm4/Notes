using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.Domain.Model;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Create;

public class CreateNoteCommandHandler : IRequestHandler<CreateNoteCommand, CreateNoteCommandResponse>
{
    private readonly IMapper _mapper;
    private readonly INoteRepository _noteRepository;

    public CreateNoteCommandHandler(IMapper mapper, INoteRepository noteRepository)
    {
        _mapper = mapper;
        _noteRepository = noteRepository;
    }
    
    public async Task<CreateNoteCommandResponse> Handle(CreateNoteCommand request, CancellationToken cancellationToken)
    {
        var response = new CreateNoteCommandResponse();
        var validator = new CreateNoteCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            response.Success = false;
            response.AddErrors(validationResult.Errors.Select(x => x.ErrorMessage));

            return response;
        }

        var newNote = _mapper.Map<Note>(request);
        await _noteRepository.AddAsync(newNote);

        response.Success = true;
        response.Note = _mapper.Map<CreateNoteDto>(newNote);

        return response;
    }
}