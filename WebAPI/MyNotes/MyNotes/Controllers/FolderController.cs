using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyNotes.Application.Implementation.Features.Folders.Commands.Create;
using MyNotes.Application.Implementation.Features.Folders.Commands.Delete;
using MyNotes.Application.Implementation.Features.Folders.Commands.Update;
using MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFolders;
using MyNotes.Application.Implementation.Features.Folders.Queries.GetAllFoldersWithNotes;

namespace MyNotes.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class FolderController : ControllerBase
{
    private readonly IMediator _mediator;

    public FolderController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost(Name = "CreateFolder")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult<CreateFolderCommandResponse>> Create([FromBody] CreateFolderCommand createCommand)
    {
        var response = await _mediator.Send(createCommand);
        if (response.Success)
        {
            return Ok(response);
        }

        return BadRequest(response);
    }
    
    [HttpDelete("{id}", Name = "DeleteFolder")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<DeleteFolderResponse>> Delete(Guid id)
    {
        var deleteFolderCommand = new DeleteFolderCommand(id);
        var result = await _mediator.Send(deleteFolderCommand);
        if (result.Success)
        {
            return Ok(result);
        }

        return NotFound(result);
    }
    
    [HttpPut("UpdateFolder")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    [ProducesDefaultResponseType]
    public async Task<ActionResult> Update([FromBody] UpdateFolderCommand updateFolderCommand)
    {
        await _mediator.Send(updateFolderCommand);

        return NoContent();
    }

    [HttpGet("All")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<FolderDto>>> GetAllFolders()
    {
        var allFolders = await _mediator.Send(new GetAllFoldersQuery());
        return Ok(allFolders);
    }

    [HttpGet("FoldersWithNotes")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<List<FolderWithNotesDto>>> GetAllFoldersWithNotes()
    {
        var foldersWithNotes = await _mediator.Send(new GetAllFoldersWithNotesQuery());

        return Ok(foldersWithNotes);
    }
}