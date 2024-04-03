using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class singletableforuserconfig : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Config");

            migrationBuilder.AddColumn<long>(
                name: "ContractNoSeed",
                table: "UserConfigs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<int>(
                name: "Currency",
                table: "UserConfigs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "DefaultContractType",
                table: "UserConfigs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "RentCalculationType",
                table: "UserConfigs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "TaxPercent",
                table: "UserConfigs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserConfigID",
                table: "UserConfigs",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ContractNoSeed",
                table: "UserConfigs");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "UserConfigs");

            migrationBuilder.DropColumn(
                name: "DefaultContractType",
                table: "UserConfigs");

            migrationBuilder.DropColumn(
                name: "RentCalculationType",
                table: "UserConfigs");

            migrationBuilder.DropColumn(
                name: "TaxPercent",
                table: "UserConfigs");

            migrationBuilder.DropColumn(
                name: "UserConfigID",
                table: "UserConfigs");

            migrationBuilder.CreateTable(
                name: "Config",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ContractNoSeed = table.Column<long>(type: "bigint", nullable: false),
                    Currency = table.Column<int>(type: "int", nullable: false),
                    DefaultContractType = table.Column<int>(type: "int", nullable: false),
                    RentCalculationType = table.Column<int>(type: "int", nullable: false),
                    TaxPercent = table.Column<int>(type: "int", nullable: false),
                    UserConfigID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Config", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Config_UserConfigs_UserConfigID",
                        column: x => x.UserConfigID,
                        principalTable: "UserConfigs",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Config_UserConfigID",
                table: "Config",
                column: "UserConfigID",
                unique: true);
        }
    }
}
