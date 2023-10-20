import { NextResponse } from "next/server"
import prisma from "../base"

export async function GET() {
    const allUniverse = await prisma.$queryRaw`SELECT table_name FROM information_schema.tables WHERE table_catalog = 'multiverse_api' AND table_schema = 'public'`
    return NextResponse.json(allUniverse)
}
