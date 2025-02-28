-- CreateTable
CREATE TABLE "Credit_card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "avaliable_limit" DECIMAL NOT NULL,
    "due_day" INTEGER NOT NULL,
    "closing_day" INTEGER NOT NULL,
    "bank_account_id" TEXT NOT NULL,
    CONSTRAINT "Credit_card_bank_account_id_fkey" FOREIGN KEY ("bank_account_id") REFERENCES "Bank_account" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
