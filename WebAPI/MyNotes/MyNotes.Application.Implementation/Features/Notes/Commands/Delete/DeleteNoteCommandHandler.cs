using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;

namespace MyNotes.Application.Implementation.Features.Notes.Commands.Delete;

public class DeleteNoteCommandHandler : IRequestHandler<DeleteNoteCommand, DeleteNoteResponse>
{
    private readonly INoteRepository _noteRepository;

    public DeleteNoteCommandHandler(INoteRepository noteRepository)
    {
        _noteRepository = noteRepository;
    }
    
    public async Task<DeleteNoteResponse> Handle(DeleteNoteCommand request, CancellationToken cancellationToken)
    {
        var itemToDelete = await _noteRepository.GetByIdAsync(request.Id);
        if (itemToDelete is null)
        {
            return new DeleteNoteResponse(false, $"Note with id: {request.Id} cannot be found", request.Id);
        }
        
        await _noteRepository.DeleteAsync(itemToDelete);
        return new DeleteNoteResponse(true, string.Empty, request.Id);
    }
}