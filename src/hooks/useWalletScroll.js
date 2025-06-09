import { useRef, useEffect } from "react";

export function useWalletScroll(walletsCount, delay = 100) {
  const walletRefs = useRef([]);

  useEffect(() => {
    if (walletsCount > 0) {
      const latestWalletIndex = walletsCount - 1;
      const latestWalletRef = walletRefs.current[latestWalletIndex];
      if (latestWalletRef) {
        setTimeout(() => {
          latestWalletRef.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }, delay);
      } else if (delay < 500) {
        setTimeout(() => {
          const retryRef = walletRefs.current[latestWalletIndex];
          if (retryRef) {
            retryRef.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }
        }, 500);
      }
    }
  }, [walletsCount, delay]);

  return { walletRefs };
}
