import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: process.env.GITHUB_DEPLOY === "true" ? "/saf-training-current/" : "/",
  lang: "en-US",
  title: "MITRE SAF Training",
  description: "The MITRE Security Automation Framework Training for Security Guidance, Hardening, Validation & Visualization",
  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
