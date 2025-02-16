/*
  Warnings:

  - You are about to drop the column `communityId` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `participants` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `scheduledAt` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `started` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the `Room` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WebRTCParticipant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[roomId]` on the table `Meeting` will be added. If there are existing duplicate values, this will fail.
  - Made the column `roomId` on table `Meeting` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Meeting" DROP CONSTRAINT "Meeting_communityId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_meetingId_fkey";

-- DropForeignKey
ALTER TABLE "WebRTCParticipant" DROP CONSTRAINT "WebRTCParticipant_roomId_fkey";

-- DropForeignKey
ALTER TABLE "WebRTCParticipant" DROP CONSTRAINT "WebRTCParticipant_userId_fkey";

-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "communityId",
DROP COLUMN "participants",
DROP COLUMN "scheduledAt",
DROP COLUMN "started",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "endTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "roomId" SET NOT NULL,
ALTER COLUMN "roomId" SET DEFAULT 'default';

-- DropTable
DROP TABLE "Room";

-- DropTable
DROP TABLE "WebRTCParticipant";

-- CreateTable
CREATE TABLE "MeetingAttendee" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MeetingAttendee_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MeetingAttendee_meetingId_userId_key" ON "MeetingAttendee"("meetingId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Meeting_roomId_key" ON "Meeting"("roomId");

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MeetingAttendee" ADD CONSTRAINT "MeetingAttendee_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
