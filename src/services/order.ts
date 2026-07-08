import type { OrderResult, OrderSubmission } from "@/types";

/**
 * Simulated order submission. Later, replace the body with a `fetch` to
 * the Django REST API. The signature is stable so UI code needs no change.
 */
export async function submitOrder(payload: OrderSubmission): Promise<OrderResult> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 900));

  const orderNumber = generateOrderNumber();
  // eslint-disable-next-line no-console
  console.info("[order] simulated submission", { orderNumber, payload });
  return { orderNumber };
}

function generateOrderNumber(): string {
  const digits = Math.floor(100000 + Math.random() * 900000);
  return `TPM-${digits}`;
}
