import { createTheme } from "@mantine/core";

const breakpoints = {
  xs: "33em",
  sm: "48em",
  md: "64em",
  lg: "74em",
  xl: "90em",
};

export const darkTheme = createTheme({
  breakpoints: breakpoints,
  colors: {
    "sazim-green": [
      "#c2e5c9",
      "#b0deb6",
      "#9ed7b4",
      "#8cd0a1",
      "#7ac98f",
      "#68c37c",
      "#58bb6a",
      "#48b358",
      "#38ab46",
      "#28a334",
    ],
    "sazim-blue": [
      "#6a79a3",
      "#5f6e94",
      "#545a85",
      "#495076",
      "#3e4667",
      "#333b58",
      "#283149",
      "#1d263a",
      "#12192b",
      "#151c34",
    ],
    "sazim-purple": [
      "#dac2e0",
      "#cba9d1",
      "#bc91c1",
      "#ad78b2",
      "#9e60a3",
      "#8f4893",
      "#803f84",
      "#875d8d",
      "#723472",
      "#5e2d5a",
    ],
  },
});
