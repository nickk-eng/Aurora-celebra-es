import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const pages = ["index", "sobre", "servicos", "servico", "fornecedores", "portfolio", "depoimentos", "blog", "contato", "orcamento"];

export default defineConfig({
  optimizeDeps: { noDiscovery: true, include: [] },
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map((page) => [page, resolve(fileURLToPath(new URL(".", import.meta.url)), `${page}.html`)])),
    },
  },
});
