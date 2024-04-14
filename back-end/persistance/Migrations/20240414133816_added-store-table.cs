using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedstoretable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDemoAccount",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ServiceType",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StoreName",
                table: "Users");

            migrationBuilder.AddColumn<long>(
                name: "StoreID",
                table: "Users",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Stores",
                columns: table => new
                {
                    ID = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ServiceType = table.Column<int>(type: "int", nullable: false),
                    IsDemoStore = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stores", x => x.ID);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_StoreID",
                table: "Users",
                column: "StoreID");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Stores_StoreID",
                table: "Users",
                column: "StoreID",
                principalTable: "Stores",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Stores_StoreID",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Stores");

            migrationBuilder.DropIndex(
                name: "IX_Users_StoreID",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "Users");

            migrationBuilder.AddColumn<bool>(
                name: "IsDemoAccount",
                table: "Users",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ServiceType",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "StoreName",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
