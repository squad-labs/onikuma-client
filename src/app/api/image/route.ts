import { generateShareImage } from '@/shared/utils/canvas';
import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

async function getResponse(req: NextRequest): Promise<NextResponse> {
  const params = await req.json();
  const image = await generateShareImage(params);

  const formData = new FormData();
  formData.append('file', new Blob([image]));

  const res = await axios.post(
    `${process.env.API_BASE_URL}/api/topics/share-image/${params.topicId}`,
    formData,
    {
      headers: {
        Authorization: `Bearer ${params.token}`,
      },
    },
  );

  return new NextResponse(JSON.stringify(res));
}

export async function POST(req: NextRequest): Promise<Response> {
  return getResponse(req);
}

export const dynamic = 'force-dynamic';
