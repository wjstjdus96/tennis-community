import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    green: {
      0: string;
      1: string;
      2: string;
      3: string;
    };
    myPageBgColor: string;
  }
}
