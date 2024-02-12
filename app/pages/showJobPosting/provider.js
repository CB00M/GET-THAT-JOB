// app/providers.tsx
"use client";

import { ChakraProvider } from "@chakra-ui/react";

function Providers({ children }) {
  return <ChakraProvider>{children}</ChakraProvider>;
}

export { Providers };
