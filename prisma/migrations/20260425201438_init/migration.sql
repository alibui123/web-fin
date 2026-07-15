-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING', 'CONFIRMED', 'SCHEDULED', 'COMPLETED', 'CANCELLED');

-- CreateTable
CREATE TABLE "ConsultationBooking" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "company" TEXT,
    "phone" TEXT,
    "focusArea" TEXT NOT NULL,
    "message" TEXT,
    "source" TEXT,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING',
    "assignedConsultant" TEXT,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ConsultationBooking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsultationBooking_email_idx" ON "ConsultationBooking"("email");

-- CreateIndex
CREATE INDEX "ConsultationBooking_focusArea_idx" ON "ConsultationBooking"("focusArea");

-- CreateIndex
CREATE INDEX "ConsultationBooking_status_idx" ON "ConsultationBooking"("status");

-- CreateIndex
CREATE INDEX "ConsultationBooking_createdAt_idx" ON "ConsultationBooking"("createdAt");
