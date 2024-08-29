import { Box } from "@chakra-ui/react";
import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <Box>
      <SignIn path="/sign-in" />
    </Box>
  );
}
