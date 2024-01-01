import { useMediaQuery } from "react-responsive";

export const useCheckIsMobile = () => {
  const isMobile = useMediaQuery({
    query: "(max-width:767px)",
  });

  return { isMobile };
};
