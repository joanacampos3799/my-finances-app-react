import {
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import faq from "../../assets/images/faq.png";
import useAddQuestion from "../hooks/useAddQuestion";

const FAQ = () => {
  const [question, setQuestion] = useState("");
  const [message, setMessage] = useState("");
  const sendQuestion = useAddQuestion();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      sendQuestion({ question: question });
      setMessage("Thank you for your question! We’ll get back to you soon.");
    } catch (error) {
      setMessage("Failed to send your question. Please try again.");
    }
    setQuestion("");
  };
  return (
    <Flex
      w="100%"
      direction={{ base: "column", md: "row" }}
      h={{ base: "auto", md: "150vh" }}
      id="faq"
    >
      <Flex w={{ base: "100%", md: "50%" }} order={{ base: 1, md: 0 }}>
        <Image
          src={faq}
          objectFit="contain"
          w={{ base: "100%", md: "90%" }}
          h={{ base: "200px", md: "auto" }}
          borderRadius="md"
        />
      </Flex>
      <Flex
        direction={"column"}
        w={{ base: "100%", md: "50%" }}
        justifyContent={"center"}
        gap={2}
      >
        <Heading color="teal.700">Frequently Asked Questions</Heading>

        <Stack>
          <Heading size={"lg"}>
            Does MoneyTrack link to my bank accounts?
          </Heading>
          <Text>
            No, MoneyTrack does not automatically link to your bank accounts.
            All transactions must be manually entered by the user. This provides
            you with full control over your financial data and ensures accuracy
            based on your inputs.
          </Text>
        </Stack>
        <Stack>
          <Heading size={"lg"}>How do I add transactions?</Heading>
          <Text>
            You can manually add transactions by entering details like amount,
            category, date, and description. This allows you to track income,
            expenses, and adjustments precisely. Each entry is fully
            customizable.
          </Text>
        </Stack>

        <Stack>
          <Heading size={"lg"}>Can I set recurring transactions?</Heading>
          <Text>
            Yes, you can manually set up fixed or recurring transactions such as
            rent, utilities, or loan payments. Once scheduled, these
            transactions will automatically appear in your history on the
            specified date.
          </Text>
        </Stack>
        <Stack>
          <Heading size={"lg"}>Is my financial data secure?</Heading>
          <Text>
            Yes, your financial data is securely stored within the app. Since
            MoneyTrack doesn’t link to external banks, you have complete control
            over what data is entered. All the data remains private and under
            your control.
          </Text>
        </Stack>
        <Stack>
          <Heading size={"lg"}>Can I track financial goals?</Heading>
          <Text>
            Yes, MoneyTrack allows you to manually set savings goals and track
            your progress. You can update your contributions towards these goals
            and visualize how close you are to achieving them with progress bars
            and summaries.
          </Text>
        </Stack>
        <Stack>
          <Heading size={"lg"}>Can I use MoneyTrack to manage my debt?</Heading>
          <Text>
            Absolutely. You can manually input debts and create repayment plans.
            The app will help you track your repayments over time, giving you a
            clear view of your debt reduction progress.
          </Text>
        </Stack>
        <Stack id="support">
          <Heading size={"lg"}>Have more questions? Ask us!</Heading>
          <form onSubmit={handleSubmit}>
            <Textarea
              id="question"
              name="question"
              rows={4}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your question here..."
              required
            />
            <Button
              colorPalette={"teal"}
              type="submit"
              className="submit-btn"
              mt="10px"
            >
              Submit
            </Button>
          </form>
          {message && (
            <Text fontWeight={"bold"} mt="10px" color={"green.600"}>
              {message}
            </Text>
          )}
        </Stack>
      </Flex>
    </Flex>
  );
};

export default FAQ;
