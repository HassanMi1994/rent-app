using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedlastcontractnoinconfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "UserConfigID",
                table: "UserConfigs",
                newName: "CalendarType");

            migrationBuilder.AddColumn<long>(
                name: "LastContractNoSeed",
                table: "UserConfigs",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "StoreID",
                table: "UserConfigs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AlterColumn<long>(
                name: "ContractNumber",
                table: "Contracts",
                type: "bigint",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastContractNoSeed",
                table: "UserConfigs");

            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "UserConfigs");

            migrationBuilder.RenameColumn(
                name: "CalendarType",
                table: "UserConfigs",
                newName: "UserConfigID");

            migrationBuilder.AlterColumn<int>(
                name: "ContractNumber",
                table: "Contracts",
                type: "int",
                nullable: false,
                oldClrType: typeof(long),
                oldType: "bigint");
        }
    }
}
