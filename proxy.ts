import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

export function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    "/area-personale/:path*",
    "/raccolte/:path*",
    "/api/fundraising-campaigns/:path*",
  ],
};
