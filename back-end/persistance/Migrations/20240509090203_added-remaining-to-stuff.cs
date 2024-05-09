using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedremainingtostuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Remaining",
                table: "Stuffs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Remaining",
                table: "Stuffs");
        }
    }
}
