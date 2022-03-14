using Microsoft.EntityFrameworkCore.Migrations;

namespace RentaCar.Migrations
{
    public partial class v22720222 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Agencija_AgencijaID",
                table: "Korisnik");

            migrationBuilder.RenameColumn(
                name: "AgencijaID",
                table: "Korisnik",
                newName: "PripadaAgencijiID");

            migrationBuilder.RenameIndex(
                name: "IX_Korisnik_AgencijaID",
                table: "Korisnik",
                newName: "IX_Korisnik_PripadaAgencijiID");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Agencija_PripadaAgencijiID",
                table: "Korisnik",
                column: "PripadaAgencijiID",
                principalTable: "Agencija",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Agencija_PripadaAgencijiID",
                table: "Korisnik");

            migrationBuilder.RenameColumn(
                name: "PripadaAgencijiID",
                table: "Korisnik",
                newName: "AgencijaID");

            migrationBuilder.RenameIndex(
                name: "IX_Korisnik_PripadaAgencijiID",
                table: "Korisnik",
                newName: "IX_Korisnik_AgencijaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Agencija_AgencijaID",
                table: "Korisnik",
                column: "AgencijaID",
                principalTable: "Agencija",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
