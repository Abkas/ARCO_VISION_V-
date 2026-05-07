import React, { createContext, useContext, useState } from "react";

type PricingContextType = {
  selectedTier: string | null;
  setSelectedTier: (tier: string) => void;
};

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export function PricingProvider({ children }: { children: React.ReactNode }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  return (
    <PricingContext.Provider value={{ selectedTier, setSelectedTier }}>
      {children}
    </PricingContext.Provider>
  );
}

export function usePricingContext() {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricingContext must be used within PricingProvider");
  }
  return context;
}
