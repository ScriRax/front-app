import { defineConfig } from '@vue/cli-service'
export default defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: "https://cat-api.alwaysdata.net",
  }
})
