-- CreateTable
CREATE TABLE "SequelizeMeta" (
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "blackHole" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "galaxy_id" INTEGER,

    CONSTRAINT "blackHole_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "galaxy" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "universe_id" INTEGER,

    CONSTRAINT "galaxy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "planet" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "is_inhabited" BOOLEAN NOT NULL DEFAULT false,
    "population" INTEGER,
    "solarSystem_id" INTEGER,
    "star_id" INTEGER,

    CONSTRAINT "planet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "remainingCelestialBodies" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "type" VARCHAR(15) NOT NULL,
    "solarSystem_id" INTEGER,

    CONSTRAINT "remainingCelestialBodies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "satellite" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "planet_id" INTEGER,

    CONSTRAINT "satellite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "solarSystem" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,
    "galaxy_id" INTEGER,

    CONSTRAINT "solarSystem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "star" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "type" VARCHAR(15) NOT NULL,
    "age" INTEGER NOT NULL,
    "solarSystem_id" INTEGER,

    CONSTRAINT "star_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "universe" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(25) NOT NULL,
    "age" INTEGER NOT NULL,

    CONSTRAINT "universe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "blackHole" ADD CONSTRAINT "blackHole_galaxy_id_fkey" FOREIGN KEY ("galaxy_id") REFERENCES "galaxy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "galaxy" ADD CONSTRAINT "galaxy_universe_id_fkey" FOREIGN KEY ("universe_id") REFERENCES "universe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planet" ADD CONSTRAINT "planet_solarSystem_id_fkey" FOREIGN KEY ("solarSystem_id") REFERENCES "solarSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "planet" ADD CONSTRAINT "planet_star_id_fkey" FOREIGN KEY ("star_id") REFERENCES "star"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "remainingCelestialBodies" ADD CONSTRAINT "remainingCelestialBodies_solarSystem_id_fkey" FOREIGN KEY ("solarSystem_id") REFERENCES "solarSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "satellite" ADD CONSTRAINT "satellite_planet_id_fkey" FOREIGN KEY ("planet_id") REFERENCES "planet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "solarSystem" ADD CONSTRAINT "solarSystem_galaxy_id_fkey" FOREIGN KEY ("galaxy_id") REFERENCES "galaxy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "star" ADD CONSTRAINT "star_solarSystem_id_fkey" FOREIGN KEY ("solarSystem_id") REFERENCES "solarSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;
