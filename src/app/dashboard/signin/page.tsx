import { Metadata } from "next";
import React from "react";
import FormSignIn from "./form";

interface ActionResult {
    errorTitle: string | null;
    errorDesc: string[];
}

interface SignInPageProps {}

export const metadata: Metadata = {
    title: "Dashboard | Sign In",
}

const SignInPage: React.FC<SignInPageProps> = () => {

    return (
        <FormSignIn />
    )
}

export default SignInPage;