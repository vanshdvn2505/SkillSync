-- CreateEnum
CREATE TYPE "MeetingStatus" AS ENUM ('SCHEDULED', 'ACTIVE', 'ENDED');

-- CreateEnum
CREATE TYPE "MeetingLevel" AS ENUM ('Beginner', 'Intermidiate', 'Advanced');

-- AlterTable
ALTER TABLE "Meeting" ADD COLUMN     "duration" DOUBLE PRECISION,
ADD COLUMN     "level" "MeetingLevel" NOT NULL DEFAULT 'Beginner',
ADD COLUMN     "maxAttendees" INTEGER NOT NULL DEFAULT 100,
ADD COLUMN     "status" "MeetingStatus" NOT NULL DEFAULT 'SCHEDULED',
ADD COLUMN     "tags" TEXT[];

-- DropEnum
DROP TYPE "RoomStatus";

-- CreateTable
CREATE TABLE "_MeetingAttendees" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_MeetingAttendees_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_MeetingAttendees_B_index" ON "_MeetingAttendees"("B");

-- AddForeignKey
ALTER TABLE "_MeetingAttendees" ADD CONSTRAINT "_MeetingAttendees_A_fkey" FOREIGN KEY ("A") REFERENCES "Meeting"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_MeetingAttendees" ADD CONSTRAINT "_MeetingAttendees_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
