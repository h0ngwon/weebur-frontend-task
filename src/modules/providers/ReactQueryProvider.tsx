import { QueryClientProvider } from "../../../node_modules/@tanstack/react-query/src/QueryClientProvider";

import { QueryCache, QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  children: React.ReactNode;
}

export default function ReactQueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        queryCache: new QueryCache({
          onError: (error) => {
            const errorMessage =
              error instanceof Error
                ? error.message
                : "알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";

            toast.error(errorMessage);
          },
        }),
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
          mutations: {
            onError: (error) => {
              const errorMessage =
                error instanceof Error
                  ? error.message
                  : "작업 중 오류가 발생했습니다. 다시 시도해주세요.";
              toast.error(errorMessage);
            },
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
