import { SignIn } from "@clerk/nextjs";

const SignInPage = () => (
  <main className="flex h-screen flex-col items-center justify-center">
    <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
      <SignIn
        appearance={{
          layout: {
            socialButtonsPlacement: "bottom",
            socialButtonsVariant: "iconButton",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  </main>
);

export default SignInPage;
