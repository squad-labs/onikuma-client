import { generateShareImage } from '@/shared/utils/canvas';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const params = await req.json();
  const image = await generateShareImage(params);

  const formData = new FormData();
  formData.append('file', new Blob([image], { type: 'image/png' }));

  const res = await fetch(
    `${process.env.API_BASE_URL}/api/topics/share-image/${params.topicId}`,
    {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    },
  );

  const data = await res.json();
  return new NextResponse(JSON.stringify(data));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
