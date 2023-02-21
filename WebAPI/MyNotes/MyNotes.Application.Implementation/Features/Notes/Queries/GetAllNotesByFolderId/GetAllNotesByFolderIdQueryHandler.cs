using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;

namespace MyNotes.Application.Implementation.Features.Notes.Queries.GetAllNotesByFolderId;

public class GetAllNotesByFolderIdQueryHandler : IRequestHandler<GetAllNotesByFolderIdQuery, List<NoteDto>>
{
    private readonly IMapper _mapper;
    private readonly INoteRepository _noteRepository;

    public GetAllNotesByFolderIdQueryHandler(IMapper mapper, INoteRepository noteRepository)
    {
        _mapper = mapper;
        _noteRepository = noteRepository;
    }
    
    public async Task<List<NoteDto>> Handle(GetAllNotesByFolderIdQuery request, CancellationToken cancellationToken)
    {
        var notesByFolderId = (await _noteRepository.GetNotesByFolderId(request.FolderId)).OrderBy(x => x.CreatedBy);

        return _mapper.Map<List<NoteDto>>(notesByFolderId);
    }
}