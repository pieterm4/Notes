using MediatR;
using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Update;

public class UpdateFolderCommand : IRequest<BaseResponse>
{
    public Guid Id { get; set; }

    public string Title { get; set; } = null!;
}