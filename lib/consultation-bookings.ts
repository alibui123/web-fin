import { isPrismaConfigured, prisma } from "./prisma"

export type ConsultationBookingStatus =
  | "PENDING"
  | "CONFIRMED"
  | "SCHEDULED"
  | "COMPLETED"
  | "CANCELLED"

export type ConsultationBookingInput = {
  name: string
  email: string
  company?: string
  phone?: string
  focusArea: string
  message?: string
  source?: string
  submittedAt?: string
  assignedConsultant?: string
}

export async function createConsultationBooking(input: ConsultationBookingInput) {
  if (!isPrismaConfigured) {
    return null
  }
  return prisma.consultationBooking.create({
    data: {
      name: input.name.trim(),
      email: input.email.trim().toLowerCase(),
      company: input.company?.trim() || null,
      phone: input.phone?.trim() || null,
      focusArea: input.focusArea.trim(),
      message: input.message?.trim() || null,
      source: input.source?.trim() || "consultation_inquiry",
      assignedConsultant: input.assignedConsultant?.trim() || null,
      submittedAt: input.submittedAt ? new Date(input.submittedAt) : new Date(),
      status: "PENDING",
    },
  })
}

export async function listConsultationBookings(limit = 100) {
  if (!isPrismaConfigured) {
    return []
  }
  return prisma.consultationBooking.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  })
}

export async function updateConsultationBookingStatus(
  id: string,
  status: ConsultationBookingStatus,
  assignedConsultant?: string,
) {
  if (!isPrismaConfigured) {
    return null
  }
  return prisma.consultationBooking.update({
    where: { id },
    data: {
      status,
      assignedConsultant: assignedConsultant?.trim() || undefined,
    },
  })
}
