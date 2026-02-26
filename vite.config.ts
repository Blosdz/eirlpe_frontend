import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq, req) => {
            // If the request already carries x-tenant-host, keep it as-is
            if (req.headers["x-tenant-host"]) {
              return;
            }
            // Inject from ?tenant= query param (used by iframes)
            const url = new URL(req.url!, "http://localhost");
            const tenant = url.searchParams.get("tenant");
            if (tenant) {
              proxyReq.setHeader("x-tenant-host", tenant);
            }
          });
        },
      },
    },
  },
});
