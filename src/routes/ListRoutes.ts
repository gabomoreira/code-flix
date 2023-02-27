import Group from "@mui/icons-material/Group";

import {
    Contacts as ContactsIcon
} from "@mui/icons-material";


export const employeeListRoutes = [
 
];
export const adminListRoutes = [
  {
    title: "Subscribers",
    type: "sub-menus",
    icon: ContactsIcon,
    data: [
      {
        name: "Categories",
        icon: Group,
        path: "/categories",
      },
    ],
  },
];