import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //host: "104.131.72.121",
    host: "192.168.10.16",
    port: "3001",
  },
});
