import { defineConfig } from 'orval';

export default defineConfig({
  priceProphet: {
    output: {
      mode: 'tags-split',
      target: 'api/price-prophet/price-prophet.ts',
      schemas: 'api/price-prophet/model',
      client: 'react-query',
      mock: true,
      baseUrl: '/price-prophet'
    },
    input: {
      target: 'api/price-prophet/openapi.en.json'
    }
  }
})