import type { Fonts } from "../types/types";

const fonts: Fonts = {
    sans: {
        thin: {
            fontFamily: "OpenSans-Thin",
            fontWeight: "100",
        },
        light: {
            fontFamily: "OpenSans-Light",
            fontWeight: "300",
        },
        regular: {
            fontFamily: "OpenSans-Regular",
            fontWeight: "400",
        },
        medium: {
            fontFamily: "OpenSans-Medium",
            fontWeight: "500",
        },
        semiBold: {
            fontFamily: "OpenSans-SemiBold",
            fontWeight: "600",
        },
        bold: {
            fontFamily: "OpenSans-Bold",
            fontWeight: "700",
        },
    },
    seasons: {
        thin: {
            fontFamily: "theseasons-lt",
            fontWeight: "100",
        },
        light: {
            fontFamily: "theseasons-lt",
            fontWeight: "300",
        },
        regular: {
            fontFamily: "theseasons-reg",
            fontWeight: "400",
        },
        medium: {
            fontFamily: "theseasons-reg",
            fontWeight: "500",
        },
        semiBold: {
            fontFamily: "theseasons-bd",
            fontWeight: "600",
        },
        bold: {
            fontFamily: "theseasons-bd",
            fontWeight: "700",
        },
    }
}

export default function configureFonts(): Fonts {
    return fonts;
}
