import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "159.65.25.16",
    //host: "192.168.10.16",
    port: "3001",
  },
});

//there will be three changes

//1-vite-config-file
//2-Config.jsx file
//3-Dashboard.jsx file
