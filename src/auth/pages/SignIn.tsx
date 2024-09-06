import { Center } from "@chakra-ui/react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <Center>
      <SignIn path="/sign-in" fallbackRedirectUrl="/s/dashboard" />
    </Center>
  );
}
