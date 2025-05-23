import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from '@/sanity/lib/client';
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { writeclient } from "@/sanity/lib/write-client";

export const { auth, signIn, signOut ,handlers} = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    }),
  ],
  callbacks:{
    async signIn({user, account, profile, email }) {
      const existinguser=await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id:profile?.id});
      if (!existinguser){
        await writeclient.create({
          _type:"author",
          id:profile?.id,
          name:user?.name,
          username:profile?.login,
          email:user?.email,
          image:user?.image,
          bio:profile?.bio||""
        });
      }

      if(existinguser){
        return true;
      }
  
    },
    async jwt({token, user, account, profile}) {
      if(account && profile){
       const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY,{id:profile?.id});
        token.id=user._id;
        
      }
      return token
    },
    async session({session, token}) {
      Object.assign(session, {id:token.id});
      
      return session;
    }

});

