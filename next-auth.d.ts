import NextAuth, { type DefaultSession } from "next-auth"

export type ExtendedUser = DefaultSession['user'] & {
    role: 'ADMIN' | 'GUEST' | 'COMPANY' | 'WORKER'
};

declare module "next-auth" {
    interface Session {
      user: ExtendedUser
    }
}