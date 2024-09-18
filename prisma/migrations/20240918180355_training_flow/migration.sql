-- CreateTable
CREATE TABLE "training" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT,

    CONSTRAINT "training_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "exercise" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "trainingId" INTEGER,

    CONSTRAINT "exercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "set" (
    "id" SERIAL NOT NULL,
    "type" TEXT,
    "weight" INTEGER NOT NULL,
    "reps" INTEGER NOT NULL,
    "description" TEXT,
    "exerciseId" INTEGER,

    CONSTRAINT "set_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "exercise" ADD CONSTRAINT "exercise_trainingId_fkey" FOREIGN KEY ("trainingId") REFERENCES "training"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "set" ADD CONSTRAINT "set_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "exercise"("id") ON DELETE SET NULL ON UPDATE CASCADE;
