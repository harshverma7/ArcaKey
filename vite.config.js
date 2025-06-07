import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  plugins: [react(), tailwindcss(), nodePolyfills()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom"],
          crypto: [
            "@solana/web3.js",
            "ethers",
            "bip39",
            "ed25519-hd-key",
            "tweetnacl",
          ],
          particles: ["react-particles", "tsparticles", "tsparticles-slim"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
