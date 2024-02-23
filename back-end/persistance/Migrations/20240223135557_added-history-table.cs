using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedhistorytable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContractNoSeed",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "RentCalculationType",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "ServiceType",
                table: "Settings");

            migrationBuilder.DropColumn(
                name: "TaxPercent",
                table: "Settings");

            migrationBuilder.RenameColumn(
                name: "Locale",
                table: "Settings",
                newName: "Data");

            migrationBuilder.AddColumn<decimal>(
                name: "BuyPrice",
                table: "Stuffs",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SellPrice",
                table: "Stuffs",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Amount",
                table: "Payment",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.AddColumn<int>(
                name: "ContractType",
                table: "Contracts",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BuyPrice",
                table: "Stuffs");

            migrationBuilder.DropColumn(
                name: "SellPrice",
                table: "Stuffs");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "ContractType",
                table: "Contracts");

            migrationBuilder.RenameColumn(
                name: "Data",
                table: "Settings",
                newName: "Locale");

            migrationBuilder.AddColumn<long>(
                name: "ContractNoSeed",
                table: "Settings",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "Currency",
                table: "Settings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RentCalculationType",
                table: "Settings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ServiceType",
                table: "Settings",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TaxPercent",
                table: "Settings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
