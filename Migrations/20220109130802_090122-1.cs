using Microsoft.EntityFrameworkCore.Migrations;

namespace RentaCar.Migrations
{
    public partial class _0901221 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Automobil_Agencija_AgencijaID",
                table: "Automobil");

            migrationBuilder.DropIndex(
                name: "IX_Automobil_AgencijaID",
                table: "Automobil");

            migrationBuilder.DropColumn(
                name: "AgencijaID",
                table: "Automobil");

            migrationBuilder.AddColumn<int>(
                name: "AgencijaAutomobilaID",
                table: "Automobil",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Automobil_AgencijaAutomobilaID",
                table: "Automobil",
                column: "AgencijaAutomobilaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Automobil_Agencija_AgencijaAutomobilaID",
                table: "Automobil",
                column: "AgencijaAutomobilaID",
                principalTable: "Agencija",
                principalColumn: "ID",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Automobil_Agencija_AgencijaAutomobilaID",
                table: "Automobil");

            migrationBuilder.DropIndex(
                name: "IX_Automobil_AgencijaAutomobilaID",
                table: "Automobil");

            migrationBuilder.DropColumn(
                name: "AgencijaAutomobilaID",
                table: "Automobil");

            migrationBuilder.AddColumn<int>(
                name: "AgencijaID",
                table: "Automobil",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Automobil_AgencijaID",
                table: "Automobil",
                column: "AgencijaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Automobil_Agencija_AgencijaID",
                table: "Automobil",
                column: "AgencijaID",
                principalTable: "Agencija",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
