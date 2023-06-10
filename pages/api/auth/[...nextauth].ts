import prisma from "@/libs/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });
        const admin = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (user) {
          if (!user || !user?.hashedPassword) {
            throw new Error("User not found");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (isPasswordValid) {
            return Promise.resolve(user);
          } else {
            return Promise.reject(new Error("Wrong password"));
          }
        } else if (admin) {
          if (!admin || !admin?.hashedPassword) {
            throw new Error("admin tidak ditemukan");
          }
          const isPasswordValid = await bcrypt.compare(
            credentials.password,
            admin.hashedPassword
          );

          if (isPasswordValid) {
            return Promise.resolve(admin);
          } else {
            return Promise.reject(new Error("Password salah"));
          }
        } else {
          return Promise.reject(new Error("User tidak ditemukan"));
        }
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
