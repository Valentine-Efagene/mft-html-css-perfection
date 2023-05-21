import { createBrowserRouter } from "react-router-dom";
import Applications from "../pages/Applications/Applications";
import App from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/applications",
        element: <Applications />,
      },
      {
        path: "/*",
        element: <Applications />,
      },
    ],
  },
]);

export default router;
