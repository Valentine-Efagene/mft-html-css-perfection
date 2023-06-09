import { createBrowserRouter, Navigate } from "react-router-dom";
import Applications from "../pages/Applications/Applications";
import App from "../App";
import NotFound from "../pages/NotFound/NotFound";
import ModalViewer from "../pages/ModalViewer/ModalViewer";

const router = createBrowserRouter([
  {
    path: "",
    element: <Navigate to="/investment-management" />,
  },
  {
    path: "/modals",
    element: <ModalViewer />,
  },
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/investment-management",
        element: <Applications />,
      },
      {
        path: "/*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
