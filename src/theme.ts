import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

// Define a theme that changes only the teal.solid semantic token
const customTheme = defineConfig({
  theme: {
    semanticTokens: {
      colors: {
        teal: {
          solid: {
            value: {
              _light: "#14b8a6",
              _dark: "#5eead4",
            },
          },
          emphasized: {
            value: {
              _light: "#14b8a6",
              _dark: "#5eead4",
            },
          },
        },
        orange: {
          solid: {
            value: {
              _light: "#f97316",
              _dark: "#fb923c",
            },
          },
        },
      },
    },
  },
});

export default createSystem(defaultConfig, customTheme);
