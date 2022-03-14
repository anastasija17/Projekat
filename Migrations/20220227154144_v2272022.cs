using Microsoft.EntityFrameworkCore.Migrations;

namespace RentaCar.Migrations
{
    public partial class v2272022 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AgencijaID",
                table: "Korisnik",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Korisnik_AgencijaID",
                table: "Korisnik",
                column: "AgencijaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Agencija_AgencijaID",
                table: "Korisnik",
                column: "AgencijaID",
                principalTable: "Agencija",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Agencija_AgencijaID",
                table: "Korisnik");

            migrationBuilder.DropIndex(
                name: "IX_Korisnik_AgencijaID",
                table: "Korisnik");

            migrationBuilder.DropColumn(
                name: "AgencijaID",
                table: "Korisnik");
        }
    }
}
