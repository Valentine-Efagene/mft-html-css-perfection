import { createBrowserRouter } from "react-router-dom";
import Applications from "../pages/Applications/Applications";
import App from "../App";
import NotFound from "../pages/NotFound/Applications";

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
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
