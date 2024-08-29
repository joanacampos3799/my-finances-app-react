import { Box } from "@chakra-ui/react";
import { SignUp } from "@clerk/clerk-react";

export default function SignUpPage() {
  return (
    <Box>
      <SignUp path="/sign-up" />
    </Box>
  );
}
