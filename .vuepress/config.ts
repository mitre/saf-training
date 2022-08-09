import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "en-US",
  title: "MITRE SAF Training",
  description: "The MITRE Security Automation Framework Team's Introduction to InSpec profile development",

  base: process.env.GITHUB_DEPLOY === "true" ? "/inspec-developer/" : "/",
  theme,
});
