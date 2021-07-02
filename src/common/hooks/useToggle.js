import React from 'react';

export default function useToggle(initialValue = false) {
  const [value, setValue] = React.useState(initialValue);
  const toggle = {
    toggle: React.useCallback(() => {
      setValue((v) => !v);
    }, []),
    on: React.useCallback(() => {
      setValue(true);
    }, []),
    off: React.useCallback(() => {
      setValue(false);
    }, []),
  };
  return [value, toggle];
}
