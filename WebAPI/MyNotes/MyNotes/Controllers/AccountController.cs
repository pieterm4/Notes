using MediatR;
using Microsoft.AspNetCore.Mvc;
using MyNotes.Application.Implementation.Features.Authentication.Login.Commands;
using MyNotes.Application.Implementation.Features.Authentication.Register;

namespace MyNotes.Controllers;

[ApiController]
public class AccountController : ControllerBase
{
    private readonly IMediator _mediator;

    public AccountController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost("api/login")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(LoginCommandResponse))]
    public async Task<ActionResult<LoginCommandResponse>> Login([FromBody] LoginCommand command)
    {
        try
        {
            var result = await _mediator.Send(command);
            if (!result.Success)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    
    [HttpPost("api/register")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest, Type = typeof(RegisterCommandResponse))]
    public async Task<ActionResult<RegisterCommandResponse>> Register([FromBody] RegisterCommand command, CancellationToken token)
    {
        var result = await _mediator.Send(command, token);
        if (!result.Success)
        {
            return BadRequest(result);
        }

        return Ok(result);
    }
}