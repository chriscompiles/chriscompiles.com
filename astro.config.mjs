import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chriscompiles.com',
  output: 'static',
  integrations: [sitemap()],
});
