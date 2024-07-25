using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedstoreidtocustomerandstuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "StoreID",
                table: "Stuffs",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "StoreID",
                table: "Customers",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "Stuffs");

            migrationBuilder.DropColumn(
                name: "StoreID",
                table: "Customers");
        }
    }
}
