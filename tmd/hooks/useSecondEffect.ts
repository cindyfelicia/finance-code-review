import { useEffect, useRef } from "react";

export function useSecondEffect(effectFunc: () => void, deps: any) {
  const isFirst = useRef(true);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
    } else {
      effectFunc();
    }
  }, deps);
}
