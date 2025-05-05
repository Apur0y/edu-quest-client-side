import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { router } from "./Routes/Routes";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "./Providers/AuthProvider";

import {

  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Bounce, ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className="max-w-screen mx-auto bg-[#0D1F1E]">
          <RouterProvider router={router} />
          <ToastContainer 
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
          transition={Bounce}
          />
        </div>
      </AuthProvider>
    </QueryClientProvider>

  </StrictMode>
);
