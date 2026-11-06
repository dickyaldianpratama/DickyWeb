import { NextResponse } from "next/server";
import { supabaseServer, BUCKET_NAME } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { data: files, error } = await supabaseServer.storage
      .from(BUCKET_NAME)
      .list("site-data", { limit: 10 });

    if (error) {
      return NextResponse.json({
        connected: false,
        error: error.message,
      }, { status: 500 });
    }

    const availableFiles = files?.map((f) => f.name) || [];

    return NextResponse.json({
      connected: true,
      bucket: BUCKET_NAME,
      hasHeroCollage: availableFiles.includes("hero-collage.json"),
      hasPortfolio: availableFiles.includes("portfolio.json"),
      hasPromo: availableFiles.includes("promo.json"),
      files: availableFiles,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Koneksi cloud gagal";
    return NextResponse.json({
      connected: false,
      error: message,
    }, { status: 500 });
  }
}
