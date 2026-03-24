/**
 * Utility functions for pricing in rupees
 */

/**
 * Generate a randomized event price in rupees
 * Price range: ₹299 to ₹2,999
 * @returns {number} Price in rupees
 */
export function generateRandomPrice() {
  const minPrice = 299;
  const maxPrice = 2999;
  const step = 100; // Round to nearest 100
  
  const randomPrice = Math.floor(
    (Math.random() * (maxPrice - minPrice + 1) + minPrice) / step
  ) * step;
  
  return randomPrice;
}

/**
 * Format price in Indian Rupees
 * @param {number} price - Price in rupees
 * @returns {string} Formatted price string (e.g., "₹499")
 */
export function formatPriceInRupees(price) {
  if (price === 0 || price === 'Free') {
    return 'Free';
  }
  return `₹${price.toLocaleString('en-IN')}`;
}

/**
 * Get or create a randomized price for an event
 * Stores in sessionStorage to maintain consistency during registration flow
 * @param {string} eventId - Event ID
 * @returns {number} Randomized price in rupees
 */
export function getEventPrice(eventId) {
  const storageKey = `event_price_${eventId}`;
  let price = sessionStorage.getItem(storageKey);

  if (!price) {
    price = generateRandomPrice();
    sessionStorage.setItem(storageKey, price);
  }

  return parseInt(price, 10);
}

/**
 * Clear the randomized price for an event (after successful booking)
 * @param {string} eventId - Event ID
 */
export function clearEventPrice(eventId) {
  const storageKey = `event_price_${eventId}`;
  sessionStorage.removeItem(storageKey);
}
