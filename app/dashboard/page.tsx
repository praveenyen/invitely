import { redirect } from "next/navigation";
import { getServerSupabase } from "@/lib/supabase-server";
import { getInvitationsByPhone } from "@/app/actions/invitation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  const mobile = (user.email ?? "").replace("91", "").replace("@invitely.app", "");
  const invitations = await getInvitationsByPhone(mobile);

  return <DashboardClient userId={user.id} mobile={mobile} invitations={invitations} />;
}
