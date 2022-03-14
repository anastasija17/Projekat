using Microsoft.EntityFrameworkCore.Migrations;

namespace RentaCar.Migrations
{
    public partial class V123567 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Iznajmljen",
                table: "Automobil");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Iznajmljen",
                table: "Automobil",
                type: "bit",
                nullable: false,
                defaultValue: false);
        }
    }
}
