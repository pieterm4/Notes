import { useCallback, useState } from "react";

export const useToggle = (initialValue: boolean = false): [boolean, any] => {
  const [value, setValue] = useState<boolean>(initialValue);
  const toggle = useCallback((): void => setValue((value) => !value), []);

  return [value, toggle];
};
