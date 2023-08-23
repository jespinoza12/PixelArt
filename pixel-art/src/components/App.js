import "../styles/App.scss";
import Editor from "./Editor";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Editor />,
    },
    // {
    //   path: "/pattern/c2c",
    //   element:<Pattern />,
    // },{
    //   path: "/pattern/c2c-inverse",
    //   element:<Pattern />,
    // },{
    //   path: "/pattern/sc-up",
    //   element:<Pattern />,
    // },{
    //   path: "/pattern/sc-down",
    //   element:<Pattern />,
    // },{
    //   path: "/pattern/sc-right",
    //   element:<Pattern />,
    // },{
    //   path: "/pattern/sc-left",
    //   element:<Pattern />,
    // }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
