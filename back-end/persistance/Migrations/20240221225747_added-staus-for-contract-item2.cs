using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedstausforcontractitem2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastStatusChangedDateTime",
                table: "ContractItems",
                newName: "LastStatusChangedDate");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastStatusChangedDate",
                table: "ContractItems",
                newName: "LastStatusChangedDateTime");
        }
    }
}
