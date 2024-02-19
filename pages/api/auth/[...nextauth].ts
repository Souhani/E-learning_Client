import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import NextAuth from "next-auth/next";
import { UpstashRedisAdapter } from "@auth/upstash-redis-adapter"
import { Adapter } from "next-auth/adapters";
import { Redis } from "@upstash/redis";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || "",
            clientSecret: process.env.GOOGLE_SECRET || ""
        })
    ],
    adapter: UpstashRedisAdapter(
      new Redis({
      url: process.env.REDIS_URL as string,
      token: process.env.REDIS_TOKEN as string,
    })) as Adapter,
    secret: process.env.SECRET
};

export default NextAuth(authOptions)