import { PrismaClient } from "@prisma/client"

// Avoid server crashes when DATABASE_URL is not configured.
const databaseUrl = process.env.DATABASE_URL
const prismaClient = databaseUrl ? new PrismaClient() : null

const prismaFallback = {
	consultationBooking: {
		async create() {
			throw new Error("Database not configured")
		},
		async findMany() {
			return []
		},
		async update() {
			throw new Error("Database not configured")
		},
	},
} as unknown as PrismaClient

export const prisma = prismaClient ?? prismaFallback
export const isPrismaConfigured = Boolean(prismaClient)
