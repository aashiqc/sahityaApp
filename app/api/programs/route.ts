import { NextRequest, NextResponse } from "next/server";
import prisma from '@/app/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const programs = await prisma?.program.findMany();
    return NextResponse.json(programs);
  } catch (error) {
    console.error('Error fetching programs:', error);
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = await prisma?.program.create({
      data: { name: body.name },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
