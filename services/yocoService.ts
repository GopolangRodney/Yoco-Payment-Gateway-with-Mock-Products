
/**
 * =============================================================================
 * !! IMPORTANT: THIS IS A MOCK BACKEND SERVICE !!
 * =============================================================================
 * In a real-world application, you would have a secure backend server (e.g., in
 * Node.js, Python, or PHP) that handles the creation of the Yoco checkout.
 *
 * This server would:
 * 1. Receive a request from the frontend with the product details.
 * 2. Use your **SECRET Yoco API key** to make a secure API call to Yoco's
 *    servers to generate a `checkoutId`.
 * 3. Return this `checkoutId` to the frontend.
 *
 * Your secret key must **NEVER** be exposed in the frontend code.
 *
 * This function simulates that network call with a delay.
 * =============================================================================
 */
export const createCheckout = (amount: number, currency: string): Promise<{ checkoutId: string }> => {
  console.log(`Simulating backend call to create checkout for ${amount} ${currency}...`);

  return new Promise((resolve) => {
    // Simulate a network delay of 1 second
    setTimeout(() => {
      // In a real scenario, this ID would come from the Yoco API
      const mockCheckoutId = `co_test_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      console.log(`Simulated backend success. Received checkoutId: ${mockCheckoutId}`);
      resolve({ checkoutId: mockCheckoutId });
    }, 1000);
  });
};
