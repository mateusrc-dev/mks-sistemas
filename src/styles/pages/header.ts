import { styled } from "..";

export const HeaderContainer = styled("header", {
  width: "100%",
  height: "101px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "$blue500",
  paddingInline: 65,
  ".countRequests": {
    color: '$gray900',
    fontSize: '$1lg',
    fontWeight: '700',
    lineHeight: 'normal',
    cursor: "pointer",
  },
  ".buttonContainer": {
    width: "90px",
    height: "45px",
    borderRadius: "8px",
    gap: "16px",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    background: "$gray500",
    border: "none",
    cursor: "pointer",
    "&:hover": {
      filter: "brightness(0.7)",
    },
  },
});

export const LogoContainer = styled("div", {
  display: "flex",
  alignItems: "baseline",
  gap: "6px"
})

export const LogoTitleOne = styled("p", {
  fontSize: "$1xl",
  color: "$gray500",
  fontWeight: 600,
  lineHeight: "19px",
})

export const LogoTitleTwo = styled("p", {
  color: "$gray500",
  fontSize: "$xl",
  fontWeight: 300,
  lineHeight: "19px",
})

export const Container = styled("div", {
  display: "flex",
  width: "100%",
  ".modal": {
    width: "100%",
    position: "absolute",
    zIndex: 2,
    top: 0,
    left: 0,
    minHeight: "100vh",
    background: "transparent",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    ".modalContent": {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      marginLeft: "auto",
      background: "$blue500",
      minHeight: "100vh",
      padding: "3rem",
      width: "32rem",
      gap: "1rem",
      boxShadow: "-5px 0px 6px 0px rgba(0, 0, 0, 0.13)",
      ".wrappperOne": {
        ".alert": {
        marginTop: '6rem',
        display: "flex",
        alignItems: 'center',
        flexDirection: "column",
        justifyContent: "center",
        gap: '2rem',
      }
      },
      ".close": {
        position: "absolute",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        top: "39px",
        right: "22px",
        width: "38px",
        height: "38px",
        background: "$gray900",
        border: "none",
        borderRadius: "100%",
        cursor: "pointer",
        "&:hover": {
          filter: "brightness(0.7)",
        },
      },
      h1: {
        color: "$gray500",
        fontSize: "27px",
        fontWeight: 700,
      },
      ".items": {
        display: "flex",
        flexDirection: "column",
        gap: "1.5rem",
        marginTop: "2rem",
        maxHeight: 358,
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: 15,
        },
        "&::-webkit-scrollbar-thumb": {
          background: "$green300",
          borderRadius: 10,
          width: 0,
          backgroundClip: "padding-box",
          border: "3px solid transparent",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "$green500",
          width: 0,
          borderRadius: 10,
          backgroundClip: "padding-box",
          border: "3px solid transparent",
        },
      },
      ".item": {
        display: "flex",
        alignItems: "center",
        gap: "1.25rem",
        ".image": {
          display: "flex",
          alignItem: "center",
          justifyContent: "center",
          background: "linear-gradient(180deg, #1ea483 0%, #7465d4 100%)",
          borderRadius: "0.5rem",
          width: "6.3rem",
        },
        ".details": {
          display: "flex",
          flexDirection: "column",
          gap: 2,
          span: {
            fontWeight: 400,
            fontSize: 18,
            lineHeight: 1.6,
            color: "$gray300",
            whiteSpace: 'nowrap',
          },
          strong: {
            fontFamily: "Roboto",
            fontSize: 18,
            lineHeight: 1.6,
            display: "flex",
            alignItems: "center",
            color: "$gray100",
          },
        },
        button: {
          marginTop: "0.5rem",
          width: 65,
          height: 26,
          fontFamily: "Roboto",
          fontStyle: "normal",
          fontWeight: 700,
          fontSize: 16,
          lineHeight: 1.6,
          color: "$green500",
          cursor: "pointer",
          border: 0,
          background: "none",
          "&:hover": {
            filter: "brightness(0.7)",
          },
        },
      },
      ".amounts": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        "span:nth-child(1)": {
          fontSize: "1rem",
          lineHeight: 1.6,
          display: "flex",
          alignItems: "center",
          color: "$gray100",
        },
        "span:nth-child(2)": {
          fontSize: "1.125rem",
          lineHeight: 1.6,
          display: "flex",
          alignItems: "center",
          color: "$gray300",
        },
      },
      ".total": {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        "strong:nth-child(1)": {
          fontWeight: 700,
          fontSize: "1.125rem",
          lineHeight: 1.6,
          display: "flex",
          alignItems: "center",
          color: "$gray100",
        },
        "strong:nth-child(2)": {
          fontSize: "1.5rem",
          lineHeight: 1.4,
          display: "flex",
          alignItems: "center",
          color: "$gray100",
        },
      },
      ".buy": {
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: 0,
        padding: 20,
        gap: 10,
        background: "$green500",
        borderRadius: 8,
        fontWeight: 700,
        fontSize: "1.125rem",
        lineHeight: 1.6,
        color: "$white",
        cursor: "pointer",
        "&:disabled": {
          opacity: 0.6,
          cursor: "not-allowed",
        },
    
        "&:not(:disabled):hover": {
          backgroundColor: "$green300",
        },
      },
    },
  },
  ".none": {
    display: "none",
  },
});
