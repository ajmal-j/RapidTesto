import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsPage from "./SettingsPage";

const Settings = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }

  return <SettingsPage user={user} />;
};

export default Settings;
