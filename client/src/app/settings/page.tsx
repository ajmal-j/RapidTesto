import Wrapper from "@/components/layout/Wrapper";
import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import SettingsPage from "./SettingsPage";

const Settings = async () => {
  const session = await getSession();
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
