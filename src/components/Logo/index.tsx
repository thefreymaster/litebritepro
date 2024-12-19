import { Box, useTheme } from "@chakra-ui/react";

export const Logo = ({ palette }: { palette: string }) => {
  const theme = useTheme();

  return (
    <Box
      height="50px"
      width="50px"
      display="inline-block"
      verticalAlign="middle"
      overflow="hidden"
      padding="10px"
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1_10)">
          <rect width="100" height="100" fill="white" />
          <rect
            width="100"
            height="100"
            fill={theme.colors?.[palette || "gray"]["900"]}
          />
          <path
            d="M47 25C47 36.0457 38.0457 45 27 45C15.9543 45 7 36.0457 7 25C7 13.9543 15.9543 5 27 5C38.0457 5 47 13.9543 47 25Z"
            fill={theme.colors?.[palette || "red"]["400"]}
          />
          <path
            d="M93 25C93 36.0457 84.0457 45 73 45C61.9543 45 53 36.0457 53 25C53 13.9543 61.9543 5 73 5C84.0457 5 93 13.9543 93 25Z"
            fill={theme.colors?.[palette || "yellow"]["300"]}
          />
          <path
            d="M93 73C93 84.0457 84.0457 93 73 93C61.9543 93 53 84.0457 53 73C53 61.9543 61.9543 53 73 53C84.0457 53 93 61.9543 93 73Z"
            fill={theme.colors?.[palette || "green"]["500"]}
          />
          <path
            d="M47 73C47 84.0457 38.0457 93 27 93C15.9543 93 7 84.0457 7 73C7 61.9543 15.9543 53 27 53C38.0457 53 47 61.9543 47 73Z"
            fill={theme.colors?.[palette || "purple"]["200"]}
          />
        </g>
        <defs>
          <clipPath id="clip0_1_10">
            <rect width="100" height="100" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </Box>
  );
};
