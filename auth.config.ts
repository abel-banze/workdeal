import Credentials from "next-auth/providers/credentials";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

import type { NextAuthConfig } from "next-auth"

const login: any = async (credentials: {
  email: string;
  password: string;
}) => {
  try {

    const check = await db.user.findUnique({
      where: {
        email: credentials.email
      }
    });
    
    if (!check) throw Error("Não existe usuário com esse email.");

    const isCorrect = await bcrypt.compare(
      credentials.password,
      check.hashPass
    );

    if (!isCorrect) throw Error("Senha incorrecta.");

    return check;
  } catch(err) {
    console.log(err)
    throw Error("Erro ao fazer o login")
  }
}

const nextAuthConfig: NextAuthConfig = {
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch(err) {
          console.log(err)
          return null;
        }
      }
    }),
    FacebookProvider({
      clientId: '381020798112514',
      clientSecret: 'b91cb367e6f1241e920c9780448526f3'
    }),
    LinkedInProvider({
      clientId: '77wpm8mgh8hyo3',
      clientSecret: '6bMSR5Sn02lVjiU6'
    })
  ]
};

export default nextAuthConfig;
