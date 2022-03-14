using Microsoft.EntityFrameworkCore.Migrations;

namespace RentaCar.Migrations
{
    public partial class _0801222 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Lokacija",
                table: "Agencija",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Naziv",
                table: "Agencija",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Lokacija",
                table: "Agencija");

            migrationBuilder.DropColumn(
                name: "Naziv",
                table: "Agencija");
        }
    }
}
