import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import { getUserById } from "@/actions/get";



export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async session({ token, session }){
      if(token.sub && session.user){
        session.user.id = token.sub;
      }

      if(token.role &&  session.user){
        session.user.role = token.role as 'ADMIN' | 'GUEST' | 'COMPANY' | 'WORKER';
      }

      return session;
    },

    async jwt({ token }){
      if(!token.sub) return token;
      
      const existingUser = await getUserById(token.sub);
      
      if(!existingUser) return token;

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,

})