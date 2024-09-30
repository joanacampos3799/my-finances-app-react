interface ChakraColorVariants {
  [key: number]: string; // Variant number maps to hex string
}

type BaseColor =
  | "gray"
  | "red"
  | "pink"
  | "purple"
  | "cyan"
  | "blue"
  | "teal"
  | "green"
  | "yellow"
  | "orange";

interface ChakraColors {
  gray: ChakraColorVariants;
  red: ChakraColorVariants;
  pink: ChakraColorVariants;
  purple: ChakraColorVariants;
  cyan: ChakraColorVariants;
  blue: ChakraColorVariants;
  teal: ChakraColorVariants;
  green: ChakraColorVariants;
  yellow: ChakraColorVariants;
  orange: ChakraColorVariants;
}
const chakraColors: ChakraColors = {
  gray: {
    50: "#FAFAFA",
    100: "#FAFAF5",
    200: "#E4E4E7",
    300: "#D4D4D8",
    400: "#A1A1AA",
    500: "#71717A",
    600: "#52525B",
    700: "#3F3F46",
    800: "#27272A",
    900: "#18181B",
    950: "#0F0F12",
  },
  red: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#F2CACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#991919",
    800: "#511111",
    900: "#300C0C",
    950: "#1F0808",
  },
  pink: {
    50: "#FDF2F8",
    100: "#FCE7F3",
    200: "#FBCFE8",
    300: "#F9A8D4",
    400: "#F472B6",
    500: "#EC4899",
    600: "#DB2777",
    700: "#A41752",
    800: "#6D0E34",
    900: "#45061F",
    950: "#2C0514",
  },
  purple: {
    50: "#FAF5FF",
    100: "#F3E8FF",
    200: "#E9D5FF",
    300: "#D8B4FE",
    400: "#C084FC",
    500: "#A855F7",
    600: "#9333EA",
    700: "#641BA3",
    800: "#4A1772",
    900: "#2F0553",
    950: "#1A032E",
  },
  cyan: {
    50: "#ECFEFF",
    100: "#CFFAFE",
    200: "#A5F3FC",
    300: "#67E8F9",
    400: "#22D3EE",
    500: "#06B6D4",
    600: "#0891B2",
    700: "#0C5C72",
    800: "#134152",
    900: "#072A38",
    950: "#051B24",
  },
  blue: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#A3CFFF",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#173DA6",
    800: "#1A3478",
    900: "#14204A",
    950: "#0C142E",
  },
  teal: {
    50: "#F0FDFA",
    100: "#CCFBF1",
    200: "#99F6E4",
    300: "#5EEAD4",
    400: "#2DD4BF",
    500: "#14B8A6",
    600: "#0D9488",
    700: "#0C5D56",
    800: "#114240",
    900: "#032726",
    950: "#021716",
  },
  green: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A",
    700: "#116932",
    800: "#124A28",
    900: "#042713",
    950: "#03190C",
  },
  yellow: {
    50: "#FEFCE8",
    100: "#FEF9C3",
    200: "#FEF08A",
    300: "#FDE047",
    400: "#FACC15",
    500: "#EAB308",
    600: "#CA8A04",
    700: "#846209",
    800: "#713F12",
    900: "#422006",
    950: "#281304",
  },
  orange: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDCA74",
    400: "#FB923C",
    500: "#F97316",
    600: "#EA590C",
    700: "#92310A",
    800: "#6C2710",
    900: "#3B1106",
    950: "#220A04",
  },
};
export default chakraColors;
