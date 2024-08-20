import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdDashboard,
  MdPieChart,
  MdHistory,
  MdAssessment,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Analytics from "views/admin/Analytics";
import Portfolio from "views/admin/Portfolio";
import Transactions from "views/admin/Transactions";

// Auth Imports
import SignInCentered from "views/auth/signIn";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdDashboard} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Portfolio",
    layout: "/admin",
    path: "/Portfolio",
    icon: (
      <Icon
        as={MdPieChart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: Portfolio,
    secondary: true,
  },
  {
    name: "Transactions",
    layout: "/admin",
    icon: <Icon as={MdHistory} width='20px' height='20px' color='inherit' />,
    path: "/Transactions",
    component: Transactions,
  },
  {
    name: "Analytics",
    layout: "/admin",
    path: "/Analytics",
    icon: <Icon as={MdAssessment} width='20px' height='20px' color='inherit' />,
    component: Analytics,
  },
];

export default routes;
