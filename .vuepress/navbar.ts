import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  // "/home",
  { 
    text: "Courses", 
    icon: "creative", 
    children: [
      { text: "SAF User Course", link: "/courses/user/", icon: "creative" },
      { text: "Beginner Security Automation Developer Course", link: "/courses/beginner/", icon: "creative" },
      { text: "Advanced Security Automation Developer Course", link: "/courses/advanced/", icon: "creative" },
      { text: "Security Guidance Developer Course", link: "/courses/guidance/", icon: "creative" },
    ]},
  { text: "Resources", icon: "note", link: "/resources/" },
  { text: "Installation", icon: "note", link: "/installation/" },
  { text: "Training Development", icon: "note", link: "/training-dev/" },
  // { text: "Theme Docs", icon: "note", link: "https://vuepress-theme-hope.github.io/v2/" },
  // {
  //   text: "Posts",
  //   icon: "edit",
  //   prefix: "/posts/",
  //   children: [
  //     {
  //       text: "Articles 1-4",
  //       icon: "edit",
  //       prefix: "article/",
  //       children: [
  //         { text: "Article 1", icon: "edit", link: "article1" },
  //         { text: "Article 2", icon: "edit", link: "article2" },
  //         "article3",
  //         "article4",
  //       ],
  //     },
  //     {
  //       text: "Articles 5-12",
  //       icon: "edit",
  //       children: [
  //         {
  //           text: "Article 5",
  //           icon: "edit",
  //           link: "article/article5",
  //         },
  //         {
  //           text: "Article 6",
  //           icon: "edit",
  //           link: "article/article6",
  //         },
  //         "article/article7",
  //         "article/article8",
  //       ],
  //     },
  //     { text: "Article 9", icon: "edit", link: "article9" },
  //     { text: "Article 10", icon: "edit", link: "article10" },
  //     "article11",
  //     "article12",
  //   ],
  // },
]);
