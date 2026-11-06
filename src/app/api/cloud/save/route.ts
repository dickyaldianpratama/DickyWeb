import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, BUCKET_NAME } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { fileName, data } = body;

    if (!fileName || data === undefined) {
      return NextResponse.json({ error: "fileName dan data wajib diisi" }, { status: 400 });
    }

    const jsonStr = JSON.stringify(data, null, 2);
    const buffer = Buffer.from(jsonStr, "utf-8");
    const filePath = `site-data/${fileName}.json`;

    const { error } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType: "application/json",
        upsert: true,
      });

    if (error) {
      console.error(`Gagal menyimpan ${fileName} ke cloud:`, error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: publicData } = supabaseServer.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicData.publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menyimpan data ke cloud";
    console.error("Cloud save exception:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
