import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "en-US",
  title: "SAF InSpec Profile Developer",
  description: "The MITRE Security Automation Framework Team's Introduction to InSpec profile development",

  base: process.env.GITHUB_DEPLOY === "true" ? "/inspec-developer/" : "/",
  theme,
});
