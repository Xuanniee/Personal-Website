-- AlterTable
ALTER TABLE "InternAchievement" ALTER COLUMN "details" SET NOT NULL,
ALTER COLUMN "details" SET DATA TYPE TEXT;

-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
