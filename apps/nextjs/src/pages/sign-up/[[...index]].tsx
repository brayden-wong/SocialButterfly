import { SignUp } from "@clerk/nextjs";

const SignUpPage = () => (
  <main className="flex h-screen flex-col items-center justify-center text-white">
    <SignUp
      appearance={{
        layout: {
          socialButtonsPlacement: "bottom",
          socialButtonsVariant: "iconButton",
        },
      }}
      path="/sign-up"
      routing="path"
      signInUrl="/sign-in"
    />
  </main>
);

export default SignUpPage;
