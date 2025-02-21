/*
  Warnings:

  - You are about to drop the column `file_url` on the `Resource` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Resource" DROP COLUMN "file_url",
ADD COLUMN     "fileUrl" TEXT NOT NULL DEFAULT '';
