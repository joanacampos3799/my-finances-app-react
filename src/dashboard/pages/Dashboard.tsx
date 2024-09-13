import { Box, Center, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import BankList from "../banks/components/BankList";

export default function DashboardPage() {
  return (
    <Box>
      <Center>
        <Heading> My Finances Tracker</Heading>
      </Center>
      <Grid
        templateAreas={{
          base: `"main"`,
          lg: `"aside main"`,
        }}
        templateColumns={{
          base: "1fr",
          lg: "250px 1fr",
        }}
      >
        <Show when="lg">
          <GridItem area="aside" paddingX={5}>
            <BankList />
          </GridItem>
        </Show>
        <GridItem area="main"></GridItem>
      </Grid>
    </Box>
  );
}
