import { useEffect } from "react";
import useConnection from "./useConnection";

export default function Detector({ children, polling, render, onChange }) {
  const { online } = useConnection(polling);

  useEffect(
    () => {
      if (onChange) {
        onChange({ online });
      }
    },
    [online]
  );

  if (render) {
    render({ online });
  }

  if (children) {
    return children({ online });
  }

  return null;
}
