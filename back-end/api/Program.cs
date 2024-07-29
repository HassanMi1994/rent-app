using api.Middleware;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using persistance;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<RsaDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

builder.Services.AddControllers()
    .AddJsonOptions(
    options => options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();

#region swagger config
builder.Services.AddSwaggerGen(setup =>
{
    var jwtSecurityScheme = new OpenApiSecurityScheme
    {
        BearerFormat = "JWT",
        Name = "JWT Authentication",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.Http,
        Scheme = JwtBearerDefaults.AuthenticationScheme,
        Description = "please enter jwt with starting with bearer ...",

        Reference = new OpenApiReference
        {
            Id = JwtBearerDefaults.AuthenticationScheme,
            Type = ReferenceType.SecurityScheme
        }
    };

    setup.AddSecurityDefinition(jwtSecurityScheme.Reference.Id, jwtSecurityScheme);

    setup.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        { jwtSecurityScheme, Array.Empty<string>() }
    });
});
#endregion

builder.Services.AddRentAppServices();
builder.Services.AddHttpContextAccessor();

//builder.Services.AddIdentityApiEndpoints<User>()
//    .AddEntityFrameworkStores<RsaDbContext>();

var corsPolicyName = "_corsPolicyName";
builder.Services.AddCors(option => option.AddPolicy(name: corsPolicyName, policy =>
{
    policy.AllowAnyHeader();
    policy.AllowAnyOrigin();
    policy.AllowAnyMethod();
    policy.SetIsOriginAllowed(origin => true);
}));



var app = builder.Build();

app.MapSwagger();
app.UseStaticFiles(new StaticFileOptions());

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseHttpsRedirection();
app.UseCors(corsPolicyName);
app.UseMiddleware<ExceptionMiddleware>();
app.UseMiddleware<AuthMiddleware>();
//app.UseAuthorization();
app.MapControllers();


app.Run();

