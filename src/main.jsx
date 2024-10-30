import { createRoot } from "react-dom/client";
import "./index.css";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./router/Router";
import AuthProvider from "./contexts/AuthProvider";
import 'sweetalert2/dist/sweetalert2.js'

// tanstack

import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </AuthProvider>
);
