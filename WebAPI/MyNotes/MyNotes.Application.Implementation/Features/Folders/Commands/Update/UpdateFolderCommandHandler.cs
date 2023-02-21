using AutoMapper;
using MediatR;
using MyNotes.Application.Contracts.DataAccessLayer.Repository;
using MyNotes.Application.Implementation.Responses;
using MyNotes.Domain.Model;

namespace MyNotes.Application.Implementation.Features.Folders.Commands.Update;

public class UpdateFolderCommandHandler : IRequestHandler<UpdateFolderCommand, BaseResponse>
{
    private readonly IMapper _mapper;
    private readonly IFolderRepository _folderRepository;

    public UpdateFolderCommandHandler(IMapper mapper, IFolderRepository folderRepository)
    {
        _mapper = mapper;
        _folderRepository = folderRepository;
    }
    
    public async Task<BaseResponse> Handle(UpdateFolderCommand request, CancellationToken cancellationToken)
    {
        var response = new BaseResponse();
        var folderToUpdate = await _folderRepository.GetByIdAsync(request.Id);
        if (folderToUpdate is null)
        {
            response.Success = false;
            response.AddError($"Folder with Id: {request.Id} does not exist");
            return response;
        }
        var validator = new UpdateFolderCommandValidator();
        var validationResult = await validator.ValidateAsync(request, cancellationToken);
        if (!validationResult.IsValid)
        {
            response.Success = false;
            response.AddErrors(validationResult.Errors.Select(x => x.ErrorMessage));

            return response;
        }

        _mapper.Map(request, folderToUpdate, typeof(UpdateFolderCommand), typeof(Folder));

        await _folderRepository.UpdateAsync(folderToUpdate);
        
        return response;
    }
}