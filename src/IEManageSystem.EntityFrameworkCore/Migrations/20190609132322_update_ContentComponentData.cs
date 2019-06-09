using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class update_ContentComponentData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Field1",
                table: "ContentComponentData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field2",
                table: "ContentComponentData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field3",
                table: "ContentComponentData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field4",
                table: "ContentComponentData",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Field5",
                table: "ContentComponentData",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Field1",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field2",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field3",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field4",
                table: "ContentComponentData");

            migrationBuilder.DropColumn(
                name: "Field5",
                table: "ContentComponentData");
        }
    }
}
