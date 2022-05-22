import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "en-US",
  title: "SAF InSpec Profile Developers",
  description: "The MITRE InSpec Team's Introduction to InSpec Profile Development",

  base: process.env.GITHUB_DEPLOY === "true" ? "/inspec-developer-2/" : "/",
  theme,
});
