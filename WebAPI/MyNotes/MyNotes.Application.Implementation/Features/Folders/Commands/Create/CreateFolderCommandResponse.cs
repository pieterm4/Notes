using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Create;

public class CreateFolderCommandResponse : BaseResponse
{
    public CreateFolderDto Folder { get; set; } = null!;
}