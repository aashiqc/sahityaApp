import {NextRequest, NextResponse} from "next/server";
import prisma from '@/app/lib/prisma'

export async function GET (request: NextRequest){
    try {
   const participants = await prisma?.participant.findMany()

    return NextResponse.json(participants);
    } catch (error) {
        console.log(error);
        
    }
}


