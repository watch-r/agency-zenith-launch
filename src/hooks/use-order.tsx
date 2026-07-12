import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface OrderContextValue {
  isOpen: boolean;
  cart: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleInCart: (id: string) => void;
  setCart: (ids: string[]) => void;
  clearCart: () => void;
  open: (preselect?: string[]) => void;
  close: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export function OrderProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [cart, setCartState] = useState<string[]>([]);

  const addToCart = useCallback(
    (id: string) =>
      setCartState((cur) => (cur.includes(id) ? cur : [...cur, id])),
    [],
  );
  const removeFromCart = useCallback(
    (id: string) => setCartState((cur) => cur.filter((i) => i !== id)),
    [],
  );
  const toggleInCart = useCallback(
    (id: string) =>
      setCartState((cur) =>
        cur.includes(id) ? cur.filter((i) => i !== id) : [...cur, id],
      ),
    [],
  );
  const setCart = useCallback((ids: string[]) => setCartState(ids), []);
  const clearCart = useCallback(() => setCartState([]), []);

  const open = useCallback((preselect?: string[]) => {
    if (preselect && preselect.length) setCartState(preselect);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(
    () => ({
      isOpen,
      cart,
      addToCart,
      removeFromCart,
      toggleInCart,
      setCart,
      clearCart,
      open,
      close,
    }),
    [
      isOpen,
      cart,
      addToCart,
      removeFromCart,
      toggleInCart,
      setCart,
      clearCart,
      open,
      close,
    ],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used within OrderProvider");
  return ctx;
}
