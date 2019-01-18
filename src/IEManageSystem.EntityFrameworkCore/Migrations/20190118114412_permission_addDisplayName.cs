using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class permission_addDisplayName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayName",
                table: "Permission",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayName",
                table: "Permission");
        }
    }
}
