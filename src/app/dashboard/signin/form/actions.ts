"use server"

import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { formSchema } from "./validation";
import { redirect } from "next/navigation";
import { lucia } from "@/lib/auth";
import { cookies } from "next/headers";

export interface ActionResult {
    errorTitle: string | null;
    errorDesc: string[] | null;
}

export async function handleSignIn(prevState: ActionResult, formData: FormData): Promise<ActionResult> {
    console.log(formData.get("email"));

    const values = formSchema.safeParse({
        email: formData.get("email"),
        password: formData.get("password")
    });

    if (!values.success) {
        const errors = values.error.issues.map((err) => err.message);
        return {
            errorTitle: "Validation Error",
            errorDesc: errors
        }
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email: values.data.email
        }
    })

    if (!existingUser) {
        return {
            errorTitle: "Invalid Credentials",
            errorDesc: ["No user found with the provided email"]
        }
    }

    const validPassword = await bcrypt.compare(values.data.password, existingUser.password);

    if (!validPassword) {
        return {
            errorTitle: "Invalid Credentials",
            errorDesc: ["Incorrect password"]
        }
    }

    const session = await lucia.createSession(existingUser.id, {});
    const sessionCookie = lucia.createSessionCookie(session.id);

    const cookieStore = await cookies();
    cookieStore.set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
    );

    return redirect("/dashboard")
}