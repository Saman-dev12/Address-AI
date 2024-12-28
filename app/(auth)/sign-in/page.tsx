import { Metadata } from "next";
import SignInPage from "./components/sign-in";

export const metadata: Metadata = {
  title: "Address-AI | Sign-in",
  description:
    "Sign in to Address-AI and access powerful tools for correcting and verifying postal addresses with AI and OCR technology.",
};

const SignIn = () => {
  return <SignInPage />;
};

export default SignIn;
