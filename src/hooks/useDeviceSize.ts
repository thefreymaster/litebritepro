import { useMediaQuery } from "@chakra-ui/react";

export const useDeviceSize = () => {
  const [isPhone, isTablet, isDesktop] = useMediaQuery([
    "(max-width: 767px)",
    "(min-width: 768px) and (max-width: 1024px)",
    "(min-width: 1025px)",
  ]);

  const isMobile = isPhone || isTablet;

  return { isPhone, isTablet, isDesktop, isMobile };
};
