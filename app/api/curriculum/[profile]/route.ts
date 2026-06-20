import { NextResponse } from "next/server";

const curricula: Record<string, string> = {
  giorgi:
    "https://a-roseodv.org/wp-content/uploads/2025/06/250624_CV_Giorgi.pdf",
  pinton:
    "https://a-roseodv.org/wp-content/uploads/2025/06/250624_CV_Pinton.pdf",
  fiorica:
    "https://a-roseodv.org/wp-content/uploads/2025/06/250624_CV_Fiorica.pdf",
  anania:
    "https://a-roseodv.org/wp-content/uploads/2025/06/250624_CV_Anania.pdf",
};

export async function GET(
  _request: Request,
  context: { params: Promise<{ profile: string }> },
) {
  const { profile } = await context.params;
  const curriculumUrl = curricula[profile];

  if (!curriculumUrl) {
    return NextResponse.json({ error: "Curriculum non trovato" }, { status: 404 });
  }

  try {
    const response = await fetch(curriculumUrl, {
      next: { revalidate: 86400 },
      headers: { Accept: "application/pdf" },
    });

    if (!response.ok || !response.body) {
      return NextResponse.json(
        { error: "Curriculum temporaneamente non disponibile" },
        { status: 502 },
      );
    }

    return new Response(response.body, {
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Content-Disposition": `inline; filename="curriculum-${profile}.pdf"`,
        "Content-Type": "application/pdf",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Curriculum temporaneamente non disponibile" },
      { status: 502 },
    );
  }
}
