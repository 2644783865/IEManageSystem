using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class update_PageComponentBase_add_filed : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "BackgroundColor",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ClassName",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Margin",
                table: "PageComponentBase",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BackgroundColor",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "ClassName",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "Margin",
                table: "PageComponentBase");
        }
    }
}
