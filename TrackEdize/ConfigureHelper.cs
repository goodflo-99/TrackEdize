using Database.Entities;
using Database.Interfaces;
using Database.Repositories;
using Database;
using Identity.Security;
using BusinessLogic.Services;

namespace TrackEdize
{
    public static class ConfigureHelper
    {
        public static void ConfigureDatabase(WebApplicationBuilder builder)
        {
            //builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseSettings"));
            builder.Services.Configure<DatabaseSettings>(builder.Configuration.GetSection("DatabaseServerSettings"));
            ConfigureRepositories(builder);
            ConfigureServices(builder);
        }
        public static void ConfigureRepositories(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<IBaseRepository<Project>, BaseRepository<Project>>();
            builder.Services.AddScoped<IBaseRepository<Issue>, BaseRepository<Issue>>();
            builder.Services.AddScoped<IBaseRepository<Chat>, BaseRepository<Chat>>();

            builder.Services.AddScoped<IssueRepository>();
            builder.Services.AddScoped<ChatRepository>();
            builder.Services.AddTransient<AccountRepository>();

        }

        public static void ConfigureServices(WebApplicationBuilder builder)
        {
            builder.Services.AddScoped<ProjectService>();
            builder.Services.AddScoped<IssueService>();
            builder.Services.AddScoped<ChatService>();
            builder.Services.AddScoped<JwtTokenService>();
        }
    }
}
