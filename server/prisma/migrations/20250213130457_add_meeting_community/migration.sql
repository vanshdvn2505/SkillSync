/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Meeting` table. All the data in the column will be lost.
  - You are about to drop the column `hostId` on the `Meeting` table. All the data in the column will be lost.
  - Added the required column `communityId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mentorId` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scheduledAt` to the `Meeting` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Meeting` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Meeting" DROP COLUMN "createdAt",
DROP COLUMN "hostId",
ADD COLUMN     "communityId" TEXT NOT NULL,
ADD COLUMN     "mentorId" TEXT NOT NULL,
ADD COLUMN     "roomId" TEXT,
ADD COLUMN     "scheduledAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "started" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "title" TEXT NOT NULL,
ALTER COLUMN "participants" SET DEFAULT ARRAY[]::TEXT[];

-- CreateTable
CREATE TABLE "Room" (
    "id" TEXT NOT NULL,
    "meetingId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebRTCParticipant" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "roomId" TEXT NOT NULL,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebRTCParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Room_meetingId_key" ON "Room"("meetingId");

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Meeting" ADD CONSTRAINT "Meeting_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_meetingId_fkey" FOREIGN KEY ("meetingId") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebRTCParticipant" ADD CONSTRAINT "WebRTCParticipant_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WebRTCParticipant" ADD CONSTRAINT "WebRTCParticipant_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
