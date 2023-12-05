export const sidebarLinks = [
    {
      type: "Home",
      route: "/",
      label: "Home",
    },
    {
      type: "File-addition-one",
      route: "/add-personal-record",
      label: "Add PR",
    },
    {
      type: "Jump",
      route: "/activities",
      label: "Activities",
    },
    {
      type: "Every-user",
      route: "/groups",
      label: "Groups",
    },
    {
      type: "Every-user",
      route: "/users",
      label: "Users",
    },
    {
      type: "Avatar",
      route: "/profile",
      label: "Profile",
    },
];
  
export const profileTabs = [
    { value: "personal-records", label: "Personal Records", icon: "/assets/pr.svg" },
    { value: "comments", label: "Comments", icon: "/assets/reply.svg" },
    { value: "share", label: "Share", icon: "/assets/share.svg" },
];
  
export const communityTabs = [
    { value: "threads", label: "Threads", icon: "/assets/reply.svg" },
    { value: "members", label: "Members", icon: "/assets/members.svg" },
    { value: "requests", label: "Requests", icon: "/assets/request.svg" },
];