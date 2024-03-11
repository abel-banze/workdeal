import bcrypt from "bcrypt";
import { CreateUserType } from "@/types"
import { db } from "@/lib/db"
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { signIn } from "@/auth";
import { AuthError } from "next-auth"


export async function register(info: CreateUserType){
    try{

        const check = await db.user.findUnique({
            where : {
                email: info.email
            }
        });

        if(check) return "exists";

        const hashPass = await bcrypt.hash(info.hashPass, 10);

        const create = await db.user.create({
            data: {
                email: info.email,
                firstName: info.firstName,
                lastName: info.lastName,
                hashPass: hashPass
            }
        });

        if(!create) return "failed";

        const signin = await login(info.email, info.hashPass);

        return login;

    }catch(err){
        console.log(err)
        return "failed";
    }
}

export async function login(email: string, password: string){
    try{

        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        });


    }catch(err){
        if(err instanceof AuthError){
            switch(err.type){
                case 'CredentialsSignin':
                    return { error: 'Credenciais incorrectos.' }
                default:
                    return { error: 'Algo correu mal.' }
            }
        }

        throw err;
    }
}
