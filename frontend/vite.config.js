import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import basicSsl from "@vitejs/plugin-basic-ssl";

export default defineConfig({
  plugins: [react(), basicSsl()],

  server: {
    host: "0.0.0.0",
    port: 5173,
    https: true,

    hmr: {
      host: process.env.VITE_CONFIG_HMR_HOST,
      protocol: "wss",
      port: 5173,
    },
  },
});