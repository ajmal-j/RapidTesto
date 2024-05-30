import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SettingsPage from "./SettingsPage";
import Wrapper from "@/components/layout/Wrapper";

const Settings = async () => {
  const session = await auth();
  const user = session?.user;
  if (!user) {
    redirect("/api/auth/signin");
  }

  return (
    <Wrapper>
      <SettingsPage user={user} />
    </Wrapper>
  );
};

export default Settings;
