"use server";

import prisma from "@/lib/prisma";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const project = await prisma.project.findUnique({
    where: {
      slug: params.slug,
    },
  });

  return NextResponse.json(project);
}
