import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwind from '@astrojs/tailwind';
import compress from 'astro-compress';
import icon from 'astro-icon';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  compressHTML: true,
  integrations: [
    mdx(),
    icon(),
    tailwind({
      applyBaseStyles: false
    }),
    compress(),
    react()
  ],
  vite: {
    resolve: {
      alias: {
        'three/examples/jsm': '/node_modules/three/examples/jsm'
      }
    }
  }
});
