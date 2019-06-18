using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class update_ContentComponentData_foreignkey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentComponentData_PageData_PageDataId",
                table: "ContentComponentData");

            migrationBuilder.AlterColumn<int>(
                name: "PageDataId",
                table: "ContentComponentData",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ContentComponentData_PageData_PageDataId",
                table: "ContentComponentData",
                column: "PageDataId",
                principalTable: "PageData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ContentComponentData_PageData_PageDataId",
                table: "ContentComponentData");

            migrationBuilder.AlterColumn<int>(
                name: "PageDataId",
                table: "ContentComponentData",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_ContentComponentData_PageData_PageDataId",
                table: "ContentComponentData",
                column: "PageDataId",
                principalTable: "PageData",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
