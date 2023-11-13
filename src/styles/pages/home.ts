import { styled } from "..";

export const CardsContainer = styled('div', {
  margin: "auto",
  display: 'flex',
  gap: "22px",
  flexWrap: 'wrap',
  width: "938px"
})

export const Product = styled("div", {
  position: "relative",
  background: "$gray500",
  borderRadius: 8,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "15px",
  boxShadow: "0px 2px 8px 0px rgba(0, 0, 0, 0.14)",
  width: "218px",
  height: "285px",

  footer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "1rem",
    cursor: "auto",
    
    ".detailsProduct": {
      padding: "0 14px",
      display: "flex",
      flexDirection: "column",
      gap: 4,
      marginTop: "14px",
      p: {
        color: "$gray800",
        fontSize: "$lg",
        fontWeight: 400,
      },
      strong: {
        color: "$gray500",
        fontSize: "$3md",
        fontWeight: 700,
      }
    },
    button: {
      position: "absolute",
      bottom: 0,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "$blue500",
      width: "100%",
      height: "31.907px",
      border: "none",
      borderRadius: "0 0 8px 8px",
      cursor: "pointer",
      color: "$gray500",
      fontSize: "$2md",
      fontWeight: 600,
      lineHeight: "18px",
      gap: "14px",
      "&:hover": {
        filter: "brightness(0.7)",
      },
    },
  },
});
