import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { client } from "./lib/prisma";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  theme: {
    logo: "/logo.svg",
  },
  adapter: PrismaAdapter(client),
  providers: [Google, Github],
});
