-- CreateTable
CREATE TABLE "_JoinedCommunities" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_JoinedCommunities_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_JoinedCommunities_B_index" ON "_JoinedCommunities"("B");

-- AddForeignKey
ALTER TABLE "_JoinedCommunities" ADD CONSTRAINT "_JoinedCommunities_A_fkey" FOREIGN KEY ("A") REFERENCES "Community"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_JoinedCommunities" ADD CONSTRAINT "_JoinedCommunities_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
