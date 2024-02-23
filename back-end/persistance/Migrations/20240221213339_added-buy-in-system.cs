using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace persistance.Migrations
{
    /// <inheritdoc />
    public partial class addedbuyinsystem : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RentedStuffs_Contracts_ContractID",
                table: "RentedStuffs");

            migrationBuilder.DropForeignKey(
                name: "FK_RentedStuffs_Stuffs_StuffID",
                table: "RentedStuffs");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RentedStuffs",
                table: "RentedStuffs");

            migrationBuilder.RenameTable(
                name: "RentedStuffs",
                newName: "ContractItems");

            migrationBuilder.RenameIndex(
                name: "IX_RentedStuffs_StuffID",
                table: "ContractItems",
                newName: "IX_ContractItems_StuffID");

            migrationBuilder.RenameIndex(
                name: "IX_RentedStuffs_ContractID",
                table: "ContractItems",
                newName: "IX_ContractItems_ContractID");

            migrationBuilder.AddColumn<int>(
                name: "ServiceType",
                table: "Stuffs",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ContractNumber",
                table: "Contracts",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "Aggregate",
                table: "ContractItems",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddPrimaryKey(
                name: "PK_ContractItems",
                table: "ContractItems",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Histories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Aggregate = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Object = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ContractItemId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Histories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Histories_ContractItems_ContractItemId",
                        column: x => x.ContractItemId,
                        principalTable: "ContractItems",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ContractItems_Aggregate",
                table: "ContractItems",
                column: "Aggregate");

            migrationBuilder.CreateIndex(
                name: "IX_Histories_ContractItemId",
                table: "Histories",
                column: "ContractItemId");

            migrationBuilder.AddForeignKey(
                name: "FK_ContractItems_Contracts_ContractID",
                table: "ContractItems",
                column: "ContractID",
                principalTable: "Contracts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ContractItems_Stuffs_StuffID",
                table: "ContractItems",
                column: "StuffID",
                principalTable: "Stuffs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContractItems_Contracts_ContractID",
                table: "ContractItems");

            migrationBuilder.DropForeignKey(
                name: "FK_ContractItems_Stuffs_StuffID",
                table: "ContractItems");

            migrationBuilder.DropTable(
                name: "Histories");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ContractItems",
                table: "ContractItems");

            migrationBuilder.DropIndex(
                name: "IX_ContractItems_Aggregate",
                table: "ContractItems");

            migrationBuilder.DropColumn(
                name: "ServiceType",
                table: "Stuffs");

            migrationBuilder.DropColumn(
                name: "ContractNumber",
                table: "Contracts");

            migrationBuilder.DropColumn(
                name: "Aggregate",
                table: "ContractItems");

            migrationBuilder.RenameTable(
                name: "ContractItems",
                newName: "RentedStuffs");

            migrationBuilder.RenameIndex(
                name: "IX_ContractItems_StuffID",
                table: "RentedStuffs",
                newName: "IX_RentedStuffs_StuffID");

            migrationBuilder.RenameIndex(
                name: "IX_ContractItems_ContractID",
                table: "RentedStuffs",
                newName: "IX_RentedStuffs_ContractID");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RentedStuffs",
                table: "RentedStuffs",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_RentedStuffs_Contracts_ContractID",
                table: "RentedStuffs",
                column: "ContractID",
                principalTable: "Contracts",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RentedStuffs_Stuffs_StuffID",
                table: "RentedStuffs",
                column: "StuffID",
                principalTable: "Stuffs",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
