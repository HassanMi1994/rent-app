using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addeddatetimetopayments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HowManyDaysClaim",
                table: "Contracts");

            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Payment",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Payment");

            migrationBuilder.AddColumn<int>(
                name: "HowManyDaysClaim",
                table: "Contracts",
                type: "int",
                nullable: true);
        }
    }
}
