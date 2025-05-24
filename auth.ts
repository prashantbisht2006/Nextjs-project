import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeclient } from "@/sanity/lib/write-client";

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user,  profile }) {
      try {
        const existingUser = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: (profile?.id),
          
          
        });
        console.log("GitHub Profile ID:", profile?.id);
console.log("Fetched existing user:", existingUser);


        if (!existingUser) {
          await writeclient.create({
            _type: "author",
            id: profile?.id,
            name: user?.name,
            username: profile?.login,
            email: user?.email,
            image: user?.image,
            bio: profile?.bio || "",
          });
        }
        console.log("signIn callback - profile:", profile);
        console.log("profile.id:", profile?.id, "type:", typeof profile?.id);



        return true;
      } catch (err) {
        console.error("SignIn error:", err);
        return false;
      }
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        try {
          const user = await client.withConfig({useCdn:false}).fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
            id: (profile?.id),
          });
          token.id = user?._id;
        } catch (err) {
          console.error("JWT error:", err);
        }
      }
      return token;
    },

    async session({ session, token }) {
        Object.assign(session, {id:token.id});
      return session;
    },
  },
});

   

