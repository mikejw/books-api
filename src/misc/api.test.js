

import { callAPI } from './api';

describe('API', () => {
  test('Api fetches data', async () => {
    const results = await callAPI(1, 12, '');
   expect(results.books).toHaveLength(12);
  });
});



