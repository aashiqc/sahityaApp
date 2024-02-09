import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Fetch participant counts for boys and girls
    const boysHalls = await prisma?.participant.groupBy({
      by: ['hall'],
      _count: {
        _all: true,
      },
    });

    const girlsHalls = await prisma?.participantGirls.groupBy({
      by: ['hall'],
      _count: {
        _all: true,
      },
    });

    // Merge the counts
    const hallCounts = mergeHallCounts(boysHalls, girlsHalls);

    // Transform the data structure
    const transformedData = Object.entries(hallCounts).map(([hallname, count]) => ({
      hallname,
      count,
    }));

    return NextResponse.json(transformedData);
  } catch (error) {
    console.error('Error fetching halls data:', error);
    return NextResponse.json({ error: 'Failed to fetch halls data' });
  }
}

function mergeHallCounts(participantCounts: any[], participantsGirlsCounts: any[]) {
  const mergedCounts: Record<string, number> = {};

  participantCounts?.forEach(({ hall, _count: { _all: participantCount } }) => {
    mergedCounts[hall] = (mergedCounts[hall] || 0) + participantCount;
  });

  participantsGirlsCounts?.forEach(({ hall, _count: { _all: participantsGirlsCount } }) => {
    mergedCounts[hall] = (mergedCounts[hall] || 0) + participantsGirlsCount;
  });

  return mergedCounts;
}
