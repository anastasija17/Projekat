using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace RentaCar.Migrations
{
    public partial class V3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Agencija",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Agencija", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Telefon = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Automobil",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Tablice = table.Column<string>(type: "nvarchar(8)", maxLength: 8, nullable: false),
                    Proizvodjac = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    GodinaProizvodnje = table.Column<int>(type: "int", nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    PotrosnjaPoKm = table.Column<double>(type: "float", nullable: false),
                    SnagaMotora = table.Column<double>(type: "float", nullable: false),
                    Boja = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    Iznajmljen = table.Column<bool>(type: "bit", nullable: false),
                    CenaPoDanuRSD = table.Column<double>(type: "float", nullable: false),
                    AgencijaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Automobil", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Automobil_Agencija_AgencijaID",
                        column: x => x.AgencijaID,
                        principalTable: "Agencija",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Iznajmljivanje",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    AutomobilID = table.Column<int>(type: "int", nullable: true),
                    Datum_Iznajmljivanja = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Datum_Vracanja = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Iznajmljivanje", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Iznajmljivanje_Automobil_AutomobilID",
                        column: x => x.AutomobilID,
                        principalTable: "Automobil",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Iznajmljivanje_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Automobil_AgencijaID",
                table: "Automobil",
                column: "AgencijaID");

            migrationBuilder.CreateIndex(
                name: "IX_Iznajmljivanje_AutomobilID",
                table: "Iznajmljivanje",
                column: "AutomobilID");

            migrationBuilder.CreateIndex(
                name: "IX_Iznajmljivanje_KorisnikID",
                table: "Iznajmljivanje",
                column: "KorisnikID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Iznajmljivanje");

            migrationBuilder.DropTable(
                name: "Automobil");

            migrationBuilder.DropTable(
                name: "Korisnik");

            migrationBuilder.DropTable(
                name: "Agencija");
        }
    }
}
