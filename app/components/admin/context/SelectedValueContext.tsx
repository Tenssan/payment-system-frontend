import React, { createContext, useState, ReactNode } from 'react';

interface SelectedValueContextProps {
  selectedValue: string;
  setSelectedValue: (value: string) => void;
}

export const SelectedValueContext = createContext<SelectedValueContextProps>({
  selectedValue: '',
  setSelectedValue: () => {},
});

export const SelectedValueProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');

  return (
    <SelectedValueContext.Provider value={{ selectedValue, setSelectedValue }}>
      {children}
    </SelectedValueContext.Provider>
  );
};
