using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedconfigtable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Config",
                table: "UserConfigs");

            migrationBuilder.CreateTable(
                name: "Config",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserConfigID = table.Column<int>(type: "int", nullable: false),
                    ContractNoSeed = table.Column<long>(type: "bigint", nullable: false),
                    TaxPercent = table.Column<int>(type: "int", nullable: false),
                    DefaultContractType = table.Column<int>(type: "int", nullable: false),
                    RentCalculationType = table.Column<int>(type: "int", nullable: false),
                    Currency = table.Column<int>(type: "int", nullable: false)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Config");

            migrationBuilder.AddColumn<string>(
                name: "Config",
                table: "UserConfigs",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
