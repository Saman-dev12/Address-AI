import { Metadata } from "next";
import SignUpPage from "./components/sign-up";

export const metadata: Metadata = {
  title: "Address-AI | Sign-up",
  description:
    "Create your Address-AI account and simplify address validation with AI-driven corrections, CSV imports, and live visualizations.",
};

const SignUp = () => {
  return <SignUpPage />;
};

export default SignUp;
