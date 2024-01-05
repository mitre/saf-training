import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
    {
      icon: "creative",
      text: "User Class",
      link: "courses/user/README.md",
      prefix: "courses/user",
      children: "structure",
      collapsible: true
    },
    {
      icon: "creative",
      text: "Beginner Class",
      prefix: "courses/beginner",
      children: "structure",
      collapsible: true
    },
    {
      icon: "creative",
      text: "Advanced Class",
      prefix: "courses/advanced/",
      children: "structure",
      collapsible: true
    },
    {
      icon: "creative",
      text: "Guidance Class",
      prefix: "courses/guidance/",
      children: "structure",
      collapsible: true
    },
        {
      icon: "creative",
      text: "InSpec Profile Development & Testing",
      prefix: "courses/profile-dev-test/",
      children: "structure",
      collapsible: true
    },
  ],
});
