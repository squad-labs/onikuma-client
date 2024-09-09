import { postShareImage } from '@/shared/api/Image';
import { generateShareImage } from '@/shared/utils/canvas';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const params = await req.json();
  const image = await generateShareImage(params);

  const res = await postShareImage({
    topicId: params.topicId,
    file: new Blob([image]),
    token: params.token,
  });

  return new NextResponse(JSON.stringify(res));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
