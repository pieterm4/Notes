using MyNotes.Application.Implementation.Responses;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Delete;

public class DeleteFolderResponse : BaseResponse
{
    public DeleteFolderResponse(bool success, string message) : base(success, message)
    {
    }
    
    public Guid Id { get; set; }
}