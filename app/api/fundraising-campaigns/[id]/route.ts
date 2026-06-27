import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/utils/supabase/server";

const editableCampaignSelect =
  "id, slug, title, description, occasion, goal_cents, end_date, project_label, honoree_name, region, video_url, cover_type, cover_preset, cover_storage_path, cover_url, status, published_at, organizer_name";

type CampaignUpdate = {
  title?: string;
  description?: string;
  organizer_name?: string | null;
  occasion?: string;
  honoree_name?: string | null;
  project_label?: string | null;
  goal_cents?: number;
  end_date?: string | null;
  region?: string | null;
  video_url?: string | null;
  cover_type?: "custom" | "preset";
  cover_preset?: string | null;
  cover_storage_path?: string | null;
  cover_url?: string | null;
  status?: "draft" | "published" | "archived";
  published_at?: string | null;
};

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json(
      { error: "Sessione scaduta. Accedi di nuovo per salvare le modifiche." },
      { status: 401 },
    );
  }

  let payload: CampaignUpdate;

  try {
    payload = (await request.json()) as CampaignUpdate;
  } catch {
    return NextResponse.json({ error: "Dati della raccolta non validi." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("fundraising_campaigns")
    .update(payload)
    .eq("id", id)
    .eq("owner_id", user.id)
    .select(editableCampaignSelect)
    .maybeSingle();

  if (error) {
    return NextResponse.json(
      {
        error: error.message,
        code: error.code,
        details: error.details,
      },
      { status: 400 },
    );
  }

  if (!data) {
    return NextResponse.json(
      { error: "Raccolta non trovata o non modificabile da questo profilo." },
      { status: 404 },
    );
  }

  return NextResponse.json({ campaign: data });
}
