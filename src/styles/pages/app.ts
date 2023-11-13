import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "100vh",
  overflow: "auto",

  "&::-webkit-scrollbar": {
    width: 15,
  },
  "&::-webkit-scrollbar-thumb": {
    background: "$blue500",
    borderRadius: 10,
    width: 0,
    backgroundClip: "padding-box",
    border: "3px solid transparent",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "$gray400",
    width: 0,
    borderRadius: 10,
    backgroundClip: "padding-box",
    border: "3px solid transparent",
  },
});