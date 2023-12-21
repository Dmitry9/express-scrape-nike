export const delay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const simulateProcessing = (ms: number, shouldMockError = false) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldMockError) {
        reject(new Error("Simulated error."));
      }
      resolve(true);
    }, ms);
  });
