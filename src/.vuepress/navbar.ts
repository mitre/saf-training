import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Classes",
    icon: "lightbulb",
    children: [
      { text: "SAF User Class", link: "/courses/user/", icon: "creative" },
      { text: "Beginner Security Automation Developer Class", link: "/courses/beginner/", icon: "creative" },
      { text: "Advanced Security Automation Developer Class", link: "/courses/advanced/", icon: "creative" },
      { text: "Security Guidance Developer Class", link: "/courses/guidance/", icon: "creative" },
      { text: "InSpec Profile Development & Testing", link: "/courses/profile-dev-test/", icon: "creative"},
      { text: "SAF Delta Class", link: "/courses/delta/", icon: "creative" },
    ]},
  { text: "Resources",
    icon: "book",
    children: [
      { text: "Class Resources", link: "/resources/README.md"},
      { text: "Codespace Resources", link: "/resources/02.md"},
      { text: "Training Development Docs", link: "/resources/03.md"},
    ]},
  { text: "Installation", icon: "note", link: "/installation/" }
]);
