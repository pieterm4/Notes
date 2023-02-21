using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.Application.Implementation.Responses;
using MyNotes.Domain.Model;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Update;

public class UpdateNoteCommandHandler : IRequestHandler<UpdateNoteCommand, BaseResponse>
{
    private readonly IMapper _mapper;
    private readonly INoteRepository _noteRepository;

    public UpdateNoteCommandHandler(IMapper mapper, INoteRepository noteRepository)
    {
        _mapper = mapper;
        _noteRepository = noteRepository;
    }
    
    public async Task<BaseResponse> Handle(UpdateNoteCommand request, CancellationToken cancellationToken)
    {
        var response = new BaseResponse();
        var noteToUpdate = await _noteRepository.GetByIdAsync(request.Id);
        if (noteToUpdate is null)
        {
            response.Success = false;
            response.AddError($"Note with Id: {request.Id} does not exist.");

            return response;
        }
        var validator = new UpdateNoteCommandValidator();

        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            response.Success = false;
            response.AddErrors(validationResult.Errors.Select(x => x.ErrorMessage));

            return response;
        }

        _mapper.Map(request, noteToUpdate, typeof(UpdateNoteCommand), typeof(Note));
        await _noteRepository.UpdateAsync(noteToUpdate);

        response.Success = true;
        
        return response;
    }
}