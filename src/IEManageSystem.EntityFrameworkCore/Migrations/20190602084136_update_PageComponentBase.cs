using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class update_PageComponentBase : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Col",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Height",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Padding",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Sign",
                table: "PageComponentBase",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Col",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "Height",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "Padding",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "Sign",
                table: "PageComponentBase");
        }
    }
}
