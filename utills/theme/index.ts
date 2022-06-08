import { themeTools, extendTheme } from "native-base"

export const theme = extendTheme({
  components: {
    View: {
      baseStyle: (props: any) => {
        return {
          // color: themeTools.mode("black", "white")(props),
          color: themeTools.mode("white", "black")(props),
        };
      },
    },
  },
})
