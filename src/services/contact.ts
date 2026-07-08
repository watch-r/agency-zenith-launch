import type { ContactFormPayload } from "@/types";

/**
 * Simulated contact form submission. Swap the body for a real API call
 * (e.g. Django `/api/contact/`) without changing the caller.
 */
export async function submitContactForm(
  payload: ContactFormPayload,
): Promise<{ ok: true }> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  // eslint-disable-next-line no-console
  console.info("[contact] simulated submission", payload);
  return { ok: true };
}
