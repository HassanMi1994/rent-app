using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class changedcolumnname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Data",
                table: "UserConfigs");

            migrationBuilder.AddColumn<string>(
                name: "Config",
                table: "UserConfigs",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Config",
                table: "UserConfigs");

            migrationBuilder.AddColumn<string>(
                name: "Data",
                table: "UserConfigs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
