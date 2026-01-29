-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "stage" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "education" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "graduationYear" INTEGER NOT NULL,
    "targetDegree" TEXT NOT NULL,
    "field" TEXT NOT NULL,
    "countries" TEXT[],
    "budget" INTEGER NOT NULL,
    "fundingType" TEXT NOT NULL,
    "ieltsStatus" TEXT NOT NULL,
    "greStatus" TEXT NOT NULL,
    "sopStatus" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "stage" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "ranking" INTEGER NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_Shortlisted" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_Locked" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_Shortlisted_AB_unique" ON "_Shortlisted"("A", "B");

-- CreateIndex
CREATE INDEX "_Shortlisted_B_index" ON "_Shortlisted"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_Locked_AB_unique" ON "_Locked"("A", "B");

-- CreateIndex
CREATE INDEX "_Locked_B_index" ON "_Locked"("B");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Shortlisted" ADD CONSTRAINT "_Shortlisted_A_fkey" FOREIGN KEY ("A") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Shortlisted" ADD CONSTRAINT "_Shortlisted_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Locked" ADD CONSTRAINT "_Locked_A_fkey" FOREIGN KEY ("A") REFERENCES "University"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_Locked" ADD CONSTRAINT "_Locked_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
