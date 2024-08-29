import { Box, Center } from "@chakra-ui/react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <Center>
      <SignUp path="/sign-up" fallbackRedirectUrl="/s/dashboard" />
    </Center>
  );
}
