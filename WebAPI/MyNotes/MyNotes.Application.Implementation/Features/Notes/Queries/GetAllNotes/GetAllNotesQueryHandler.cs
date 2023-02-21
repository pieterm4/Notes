using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.Application.Contracts.Services;

namespace MyNotes.Application.Implementation.Features.Notes.Queries.GetAllNotes;

public class GetAllNotesQueryHandler : IRequestHandler<GetAllNotesQuery, List<NoteDto>>
{
    private readonly IMapper _mapper;
    private readonly INoteRepository _noteRepository;
    private readonly ILoggedInUserService _loggedInUserService;

    public GetAllNotesQueryHandler(IMapper mapper, INoteRepository noteRepository, ILoggedInUserService loggedInUserService)
    {
        _mapper = mapper;
        _noteRepository = noteRepository;
        _loggedInUserService = loggedInUserService;
    }
    
    public async Task<List<NoteDto>> Handle(GetAllNotesQuery request, CancellationToken cancellationToken)
    {
        var notes = await _noteRepository.Get(x => x.CreatedBy == _loggedInUserService.UserId);

        return _mapper.Map<List<NoteDto>>(notes);
    }
}