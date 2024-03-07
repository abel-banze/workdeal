import Credentials from "next-auth/providers/credentials";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth"

const login: any = async (credentials: {
  email: string;
  password: string;
}) => {
  try{

      console.log('from login - auth.config.ts', credentials)

      const check = await db.user.findUnique({
          where: {
            email: credentials.email
          }
      });

      console.log(check)
      
      if(!check) throw Error("Não existe usuário com esse email.");

      const isCorrect = await bcrypt.compare(
          credentials.password,
          check.hashPass
      );

      if(!isCorrect) throw Error("Senha incorrecta.");

      return check;
  }catch(err){
      console.log(err)
      throw Error("Erro ao fazer o login")
  }
}

export default {
  providers: [
    Credentials({
      async authorize(credentials){
        try{
          console.log('from authorize: ', credentials)
          const user = await login(credentials);
          return user;
        }catch(err){
            console.log(err)
            return null;
        }
      }
    })
  ],
} satisfies NextAuthConfig