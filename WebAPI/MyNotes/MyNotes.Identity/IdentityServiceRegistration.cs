using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using MyNotes.Application.Contracts.Services.Identity;
using MyNotes.Identity.Context;
using MyNotes.Identity.Model;
using MyNotes.Identity.Services;
using Newtonsoft.Json;

namespace MyNotes.Identity;

public static class IdentityServiceRegistration
{
    public static void AddIdentityServices(this WebApplicationBuilder builder)
    {
        builder.Services.AddDbContext<AppIdentityDbContext>(options =>
            options.UseSqlServer(builder.Configuration.GetConnectionString("IdentityDbConnection")));
        builder.Services.AddIdentityCore<ApplicationUser>(opt =>
            {
                opt.Password.RequireDigit = true;
                opt.Password.RequiredLength = 8;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = true;
                opt.Password.RequireLowercase = true;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<AppIdentityDbContext>()
            .AddDefaultTokenProviders()
            .AddSignInManager<SignInManager<ApplicationUser>>();

        builder.Services.AddTransient<IAuthenticationService, AuthenticationService>();
        builder.Services.AddTransient<IIdentityTokenClaimService, IdentityTokenClaimService>();

        var key = Encoding.ASCII.GetBytes(Environment.GetEnvironmentVariable("JWT_SECRET_KEY") ?? string.Empty);
        builder.Services.AddAuthentication(config => { config.DefaultScheme = JwtBearerDefaults.AuthenticationScheme; })
            .AddJwtBearer(config =>
            {
                config.RequireHttpsMetadata = false;
                config.SaveToken = true;
                config.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
                config.Events = new JwtBearerEvents()
                {
                    OnAuthenticationFailed = c =>
                    {
                        c.NoResult();
                        c.Response.StatusCode = 500;
                        c.Response.ContentType = "text/plain";
                        return c.Response.WriteAsync(c.Exception.ToString());
                    },
                    OnChallenge = context =>
                    {
                        context.HandleResponse();
                        context.Response.StatusCode = 401;
                        context.Response.ContentType = "application/json";
                        var result = JsonConvert.SerializeObject("401 Not authorized");
                        return context.Response.WriteAsync(result);
                    },
                    OnForbidden = context =>
                    {
                        context.Response.StatusCode = 403;
                        context.Response.ContentType = "application/json";
                        var result = JsonConvert.SerializeObject("403 Not authorized");
                        return context.Response.WriteAsync(result);
                    },
                };
            });
    }
}