import { useEffect } from "react";
import useConnection from "./useConnection";

export default function Offline({ children, polling, onChange }) {
  const { online } = useConnection(polling);

  useEffect(
    () => {
      if (onChange) {
        onChange({ online });
      }
    },
    [online]
  );

  return !online ? children : null;
}
