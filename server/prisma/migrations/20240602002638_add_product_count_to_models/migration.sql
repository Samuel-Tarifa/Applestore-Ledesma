-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_IphoneModel" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "productsCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_IphoneModel" ("id", "name") SELECT "id", "name" FROM "IphoneModel";
DROP TABLE "IphoneModel";
ALTER TABLE "new_IphoneModel" RENAME TO "IphoneModel";
CREATE UNIQUE INDEX "IphoneModel_name_key" ON "IphoneModel"("name");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
