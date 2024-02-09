import {NextRequest, NextResponse} from "next/server";
import prisma from '@/app/lib/prisma'

export async function GET (request: NextRequest){
    try {
   const participantsgirls = await prisma?.participantGirls.findMany()

    return NextResponse.json(participantsgirls);
    } catch (error) {
        console.log(error);
        
    }
}


