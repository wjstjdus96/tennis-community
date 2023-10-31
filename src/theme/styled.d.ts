import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    green: {
      1: string;
      2: string;
      3: string;
    };
  }
}
