-- CreateTable
CREATE TABLE "Article" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "uploaded_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "last_edited" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleTopic" (
    "article_id" INTEGER NOT NULL,
    "topic_id" INTEGER NOT NULL,

    CONSTRAINT "ArticleTopic_pkey" PRIMARY KEY ("article_id","topic_id")
);

-- CreateTable
CREATE TABLE "Internship" (
    "id" SERIAL NOT NULL,
    "intern_title" TEXT NOT NULL,
    "company" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Internship_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InternAchievement" (
    "id" SERIAL NOT NULL,
    "internship_id" INTEGER NOT NULL,
    "details" TEXT[],

    CONSTRAINT "InternAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_name_key" ON "Topic"("name");

-- AddForeignKey
ALTER TABLE "ArticleTopic" ADD CONSTRAINT "ArticleTopic_article_id_fkey" FOREIGN KEY ("article_id") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleTopic" ADD CONSTRAINT "ArticleTopic_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InternAchievement" ADD CONSTRAINT "InternAchievement_internship_id_fkey" FOREIGN KEY ("internship_id") REFERENCES "Internship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
