using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyNotes.Application.Implementation.Features.Notes.Commands.Create;
using MyNotes.Application.Implementation.Features.Notes.Commands.Delete;
using MyNotes.Application.Implementation.Features.Notes.Commands.Update;
using MyNotes.Application.Implementation.Features.Notes.Queries;
using MyNotes.Application.Implementation.Features.Notes.Queries.GetAllNotes;
using MyNotes.Application.Implementation.Features.Notes.Queries.GetAllNotesByFolderId;

namespace MyNotes.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NoteController : ControllerBase
{
    private readonly IMediator _mediator;

    public NoteController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost(Name = "CreateNote")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<CreateNoteCommandResponse>> CreateNote([FromBody] CreateNoteCommand createNoteCommand)
    {
        var result = await _mediator.Send(createNoteCommand);
        if (result.Success)
        {
            return Ok(result);
        }

        return BadRequest(result);
    }

    [HttpDelete("{id}", Name = "DeleteNote")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> DeleteNote(Guid id)
    {
        var deleteNoteCommand = new DeleteNoteCommand { Id = id };
        var result = await _mediator.Send(deleteNoteCommand);
        if (result.Success)
        {
            return Ok(result);
        }

        return NotFound(result);
    }

    [HttpPut("UpdateNote")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> UpdateNote([FromBody] UpdateNoteCommand updateNoteCommand)
    {
        await _mediator.Send(updateNoteCommand);

        return NoContent();
    }

    [HttpGet("All")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<NoteDto>>> GetAllNotes()
    {
        var result = await _mediator.Send(new GetAllNotesQuery());

        return Ok(result);
    }

    [HttpGet("by_folder/{folderId}", Name = "GetNotesByFolderId")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<NoteDto>>> GetNotesByFolderId(Guid folderId)
    {
        var query = new GetAllNotesByFolderIdQuery { FolderId = folderId };
        var result = await _mediator.Send(query);

        return Ok(result);
    }
}