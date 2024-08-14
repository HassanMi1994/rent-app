using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedcreatedbyinpaymentsandreturnitem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CreatedByID",
                table: "ReturnedItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedByID",
                table: "ReturnedItems",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CreatedByID",
                table: "Payment",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "UpdatedByID",
                table: "Payment",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ReturnedItems_CreatedByID",
                table: "ReturnedItems",
                column: "CreatedByID");

            migrationBuilder.CreateIndex(
                name: "IX_ReturnedItems_UpdatedByID",
                table: "ReturnedItems",
                column: "UpdatedByID");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_CreatedByID",
                table: "Payment",
                column: "CreatedByID");

            migrationBuilder.CreateIndex(
                name: "IX_Payment_UpdatedByID",
                table: "Payment",
                column: "UpdatedByID");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Users_CreatedByID",
                table: "Payment",
                column: "CreatedByID",
                principalTable: "Users",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_Payment_Users_UpdatedByID",
                table: "Payment",
                column: "UpdatedByID",
                principalTable: "Users",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ReturnedItems_Users_CreatedByID",
                table: "ReturnedItems",
                column: "CreatedByID",
                principalTable: "Users",
                principalColumn: "ID");

            migrationBuilder.AddForeignKey(
                name: "FK_ReturnedItems_Users_UpdatedByID",
                table: "ReturnedItems",
                column: "UpdatedByID",
                principalTable: "Users",
                principalColumn: "ID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Users_CreatedByID",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_Payment_Users_UpdatedByID",
                table: "Payment");

            migrationBuilder.DropForeignKey(
                name: "FK_ReturnedItems_Users_CreatedByID",
                table: "ReturnedItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ReturnedItems_Users_UpdatedByID",
                table: "ReturnedItems");

            migrationBuilder.DropIndex(
                name: "IX_ReturnedItems_CreatedByID",
                table: "ReturnedItems");

            migrationBuilder.DropIndex(
                name: "IX_ReturnedItems_UpdatedByID",
                table: "ReturnedItems");

            migrationBuilder.DropIndex(
                name: "IX_Payment_CreatedByID",
                table: "Payment");

            migrationBuilder.DropIndex(
                name: "IX_Payment_UpdatedByID",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "CreatedByID",
                table: "ReturnedItems");

            migrationBuilder.DropColumn(
                name: "UpdatedByID",
                table: "ReturnedItems");

            migrationBuilder.DropColumn(
                name: "CreatedByID",
                table: "Payment");

            migrationBuilder.DropColumn(
                name: "UpdatedByID",
                table: "Payment");
        }
    }
}
