import { NextRequest, NextResponse } from "next/server";
import { supabaseServer, BUCKET_NAME } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { image, folder = "hero", customFileName } = body;

    if (!image || typeof image !== "string") {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Jika sudah berupa URL online eksternal, gunakan langsung
    if (image.startsWith("http://") || image.startsWith("https://")) {
      return NextResponse.json({ success: true, url: image });
    }

    if (!image.startsWith("data:")) {
      return NextResponse.json({ error: "Format gambar data URL tidak valid" }, { status: 400 });
    }

    const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
    if (!matches || matches.length !== 3) {
      return NextResponse.json({ error: "Data base64 tidak terbaca" }, { status: 400 });
    }

    const contentType = matches[1];
    let fileExt = "jpg";
    if (contentType.includes("png")) fileExt = "png";
    else if (contentType.includes("webp")) fileExt = "webp";
    else if (contentType.includes("gif")) fileExt = "gif";
    else if (contentType.includes("svg")) fileExt = "svg";

    const buffer = Buffer.from(matches[2], "base64");
    const uniqueName =
      customFileName ||
      `${folder}-${Date.now()}-${Math.random().toString(36).substring(2, 7)}.${fileExt}`;
    const filePath = `${folder}/${uniqueName}`;

    const { error: uploadError } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .upload(filePath, buffer, {
        contentType,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage upload error:", uploadError);
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicData } = supabaseServer.storage
      .from(BUCKET_NAME)
      .getPublicUrl(filePath);

    return NextResponse.json({ success: true, url: publicData.publicUrl });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengunggah foto ke cloud";
    console.error("Cloud upload exception:", err);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
