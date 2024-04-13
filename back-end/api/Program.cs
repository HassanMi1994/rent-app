using domain.entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using persistance;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<RsaDbContext>(options =>
{
    options.UseSqlServer(builder.Configuration["ConnectionStrings:DefaultConnection"]);
});

builder.Services.AddAuthorization(options => { });

builder.Services.AddIdentityApiEndpoints<User>()
    .AddRoles<IdentityRole>()//added for testing
    .AddEntityFrameworkStores<RsaDbContext>();

builder.Services.AddControllers()
    .AddJsonOptions(
    options => options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles);

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddRentAppServices();

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

app.MapIdentityApi<User>();

app.MapSwagger().RequireAuthorization();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(corsPolicyName);
app.UseAuthorization();
app.MapControllers();

app.Run();
