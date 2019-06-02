using Microsoft.EntityFrameworkCore.Migrations;

namespace IEManageSystem.Migrations
{
    public partial class PageComponentBase_Add_PageId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PageComponentBase_Pages_PageBaseId",
                table: "PageComponentBase");

            migrationBuilder.DropIndex(
                name: "IX_PageComponentBase_PageBaseId",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "PageBaseId",
                table: "PageComponentBase");

            migrationBuilder.AddColumn<int>(
                name: "PageId",
                table: "PageComponentBase",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_PageId",
                table: "PageComponentBase",
                column: "PageId");

            migrationBuilder.AddForeignKey(
                name: "FK_PageComponentBase_Pages_PageId",
                table: "PageComponentBase",
                column: "PageId",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PageComponentBase_Pages_PageId",
                table: "PageComponentBase");

            migrationBuilder.DropIndex(
                name: "IX_PageComponentBase_PageId",
                table: "PageComponentBase");

            migrationBuilder.DropColumn(
                name: "PageId",
                table: "PageComponentBase");

            migrationBuilder.AddColumn<int>(
                name: "PageBaseId",
                table: "PageComponentBase",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PageComponentBase_PageBaseId",
                table: "PageComponentBase",
                column: "PageBaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_PageComponentBase_Pages_PageBaseId",
                table: "PageComponentBase",
                column: "PageBaseId",
                principalTable: "Pages",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
