using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedstoreidincontract : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "StoreID",
                table: "Contracts",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Contracts_StoreID",
                table: "Contracts",
                column: "StoreID");

            migrationBuilder.AddForeignKey(
                name: "FK_Contracts_Stores_StoreID",
                table: "Contracts",
                column: "StoreID",
                principalTable: "Stores",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contracts_Stores_StoreID",
                table: "Contracts");

            migrationBuilder.DropIndex(
                name: "IX_Contracts_StoreID",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "Contracts");
        }
    }
}
