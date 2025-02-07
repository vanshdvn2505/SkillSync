-- CreateEnum
CREATE TYPE "Role" AS ENUM ('learner', 'mentor');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'learner';
