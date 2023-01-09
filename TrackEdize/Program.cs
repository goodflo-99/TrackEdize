using System.Text;
using Database;
using Database.Entities;
using Database.Interfaces;
using Database.Repositories;
using Identity.Security;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.UI;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using TrackEdize;
using Database.Entities.Identity;
using AspNetCore.Identity.MongoDbCore.Extensions;
using AspNetCore.Identity.MongoDbCore.Infrastructure;
using TrackEdize.SignalR.HubConfig;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDatabaseDeveloperPageExceptionFilter();


var dbSettings = builder.Configuration.GetSection("DatabaseServerSettings").Get<DatabaseSettings>();

builder.Services.AddIdentity<ApplicationUser, ApplicationRole>(op =>
{
    op.User.RequireUniqueEmail = true;
    op.Password.RequiredUniqueChars = 0;
    op.Password.RequireNonAlphanumeric = false;
    op.Password.RequiredLength = 3;
    op.Password.RequireUppercase = false;
    op.Password.RequireDigit = false;

}).AddMongoDbStores<ApplicationUser, ApplicationRole, string>(dbSettings.ConnectionString, dbSettings.DatabaseName)
  .AddUserManager<UserManager<ApplicationUser>>()
  .AddSignInManager<SignInManager<ApplicationUser>>()
  .AddRoleManager<RoleManager<ApplicationRole>>();


//MongoDbIdentityConfiguration config = new MongoDbIdentityConfiguration()
//{
//    MongoDbSettings = new MongoDbSettings()
//    {
//        ConnectionString = dbSettings.ConnectionString,
//        DatabaseName = dbSettings.DatabaseName
//    },
//    IdentityOptionsAction = op =>
//    {
//        op.User.RequireUniqueEmail = true;
//    }
//};

//builder.Services.ConfigureMongoDbIdentity<ApplicationUser, ApplicationRole, string>(config)
//    .AddUserManager<UserManager<ApplicationUser>>()
//    .AddSignInManager<SignInManager<ApplicationUser>>()
//    .AddRoleManager<RoleManager<ApplicationRole>>();


builder.Services.AddAuthentication(opt =>
{
    opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(o =>
    {
        o.RequireHttpsMetadata = false;
        o.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = AuthOptions.ISSUER,
            ValidateAudience = true,
            ValidAudience = AuthOptions.AUDIENCE,
            ValidateLifetime = true,
            IssuerSigningKey = AuthOptions.SymmetricSecurityKey,
            ValidateIssuerSigningKey = true
        };
    });

builder.Services.AddControllersWithViews();
builder.Services.AddSwaggerGen();
builder.Services.AddRazorPages();
builder.Services.AddSignalR();

builder.Services.AddCors(x =>
{
    //x.AddPolicy("CorsPolicy", b =>
    //{
    //    b.AllowAnyMethod();
    //    b.AllowAnyHeader();
    //    b.WithOrigins("https://localhost:44497", "http://localhost:44497");
    //    b.AllowCredentials();        
    //});

    x.AddDefaultPolicy(b=>
    {
        b.AllowAnyMethod();
        b.AllowAnyHeader();
        b.WithOrigins("https://localhost:44497", "http://localhost:44497");
        //b.AllowAnyOrigin();
        b.AllowCredentials();
    });
});


ConfigureHelper.ConfigureDatabase(builder);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //app.UseCors(c =>
    //{
    //    c.AllowAnyHeader();
    //    c.AllowAnyMethod();
    //    //c.AllowAnyOrigin();
    //    c.WithOrigins("https://localhost:44497");
    //    //c.DisallowCredentials();
    //});


    app.UseMigrationsEndPoint();
    app.UseSwagger();
    app.UseSwaggerUI();
}
else
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

//app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

//app.UseCors("CorsPolicy");
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action?}/{id?}").RequireAuthorization();

app.MapHub<ChatHub>("/chat");
app.MapRazorPages();

app.MapFallbackToFile("index.html");

app.Run();
