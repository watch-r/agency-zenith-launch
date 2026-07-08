import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

interface OrderContextValue {
  isOpen: boolean;
  open: (preselect?: string[]) => void;
  close: () => void;
  preselected: string[];
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselected, setPreselected] = useState<string[]>([]);

  const open = useCallback((preselect?: string[]) => {
    setPreselected(preselect ?? []);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({ isOpen, open, close, preselected }),
    [isOpen, open, close, preselected],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
