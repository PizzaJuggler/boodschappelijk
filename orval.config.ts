import { defineConfig } from 'orval';

export default defineConfig({
  priceProphet: {
    output: {
      mode: 'tags-split',
      target: 'api/price-prophet/price-prophet.ts',
      schemas: 'api/price-prophet/model',
      client: 'react-query',
      mock: true
    },
    input: {
      target: 'api/price-prophet/openapi.en.json'
    }
  }
})