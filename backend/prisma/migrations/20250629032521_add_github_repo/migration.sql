/*
  Warnings:

  - You are about to drop the `Project` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Project";

-- CreateTable
CREATE TABLE "Repository" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "full_name" TEXT NOT NULL,
    "private" BOOLEAN NOT NULL,
    "html_url" TEXT NOT NULL,
    "description" TEXT,
    "language" TEXT,
    "stargazers_count" INTEGER NOT NULL,
    "open_issues" INTEGER NOT NULL,
    "forks_count" INTEGER NOT NULL,
    "subscribers_count" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "pushed_at" TIMESTAMP(3),
    "homepage" TEXT,

    CONSTRAINT "Repository_pkey" PRIMARY KEY ("id")
);
