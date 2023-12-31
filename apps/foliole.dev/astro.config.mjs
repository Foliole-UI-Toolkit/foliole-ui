import { defineConfig } from 'astro/config'
import astroVue from '@astrojs/vue'
// import vue from '@vitejs/plugin-vue'
import tailwind from '@astrojs/tailwind'
import svelte from '@astrojs/svelte'
import autoprefixer from 'autoprefixer'

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    astroVue(),
    svelte(),
  ],
  // vite: {
  //   plugins: [vue()],
  // },
})
