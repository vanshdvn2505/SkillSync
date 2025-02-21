-- CreateTable
CREATE TABLE "Resource" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "resource_link" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "tags" TEXT[],
    "communityId" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Resource" ADD CONSTRAINT "Resource_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
