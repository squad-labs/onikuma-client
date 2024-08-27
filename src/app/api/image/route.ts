import { generateShareImage } from '@/shared/utils/canvas';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const params = await req.json();
  const image = await generateShareImage(params);

  const dataUrl = `data:image/png;base64,${image.toString('base64')}`;

  return new NextResponse(dataUrl);
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
