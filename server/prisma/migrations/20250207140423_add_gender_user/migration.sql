-- AlterTable
ALTER TABLE "Community" ADD COLUMN     "profile_image_url" TEXT,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "skills" TEXT[] DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "description" SET DEFAULT '';

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "gender" TEXT NOT NULL DEFAULT 'Other',
ALTER COLUMN "last_name" SET DEFAULT '';
