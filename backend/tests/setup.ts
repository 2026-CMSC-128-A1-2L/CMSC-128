import { expect } from 'vitest';

expect.extend({
  statusToBe(response, expected) {
    const { statusCode, body } = response;
    const pass = statusCode === expected;

    return {
      pass,
      message: () =>
        pass
          ? `Expected status not to be ${expected}`
          : `Expected status ${expected} but received ${statusCode}\n` +
            `Response Body: ${JSON.stringify(body, null, 2)}`,
    };
  },
});
