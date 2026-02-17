// Mock API configuration
export const API_CONFIG = {
  /** Simulated delay range in ms */
  minDelay: 400,
  maxDelay: 900,
  /** Simulated failure rate (0-1) */
  failureRate: 0.1,
};

export function simulateDelay(): Promise<void> {
  const delay = API_CONFIG.minDelay + Math.random() * (API_CONFIG.maxDelay - API_CONFIG.minDelay);
  return new Promise((resolve) => setTimeout(resolve, delay));
}

export function maybeThrow(): void {
  if (Math.random() < API_CONFIG.failureRate) {
    throw new Error('Simulated network error');
  }
}
