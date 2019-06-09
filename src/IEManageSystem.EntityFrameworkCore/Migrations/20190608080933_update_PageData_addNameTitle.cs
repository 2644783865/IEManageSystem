using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class update_PageData_addNameTitle : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PageData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "PageData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "PageData");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "PageData");
        }
    }
}
