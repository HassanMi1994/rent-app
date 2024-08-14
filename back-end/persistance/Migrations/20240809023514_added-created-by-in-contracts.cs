using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedcreatedbyincontracts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatedByID",
                table: "Contracts",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedByID",
                table: "Contracts",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_CreatedByID",
                table: "Contracts",
                column: "CreatedByID");

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_UpdatedByID",
                table: "Contracts",
                column: "UpdatedByID");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_Users_CreatedByID",
                table: "Contracts",
                column: "CreatedByID",
                principalTable: "Users",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_Users_UpdatedByID",
                table: "Contracts",
                column: "UpdatedByID",
                principalTable: "Users",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_Users_CreatedByID",
                table: "Contracts");

            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_Users_UpdatedByID",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_CreatedByID",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_UpdatedByID",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "CreatedByID",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "UpdatedByID",
                table: "Contracts");
        }
    }
}
