using System.Reflection;
using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace MyNotes.Application.Implementation;

public static class ApplicationServiceRegistration
{
    public static void AddApplicationServices(this IServiceCollection services)
    {
        services.AddAutoMapper(Assembly.GetExecutingAssembly());
        services.AddMediatR(Assembly.GetExecutingAssembly());
    }
}