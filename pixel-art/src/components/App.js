import "../styles/App.scss";
import Editor from "./Editor";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PatternReader from "./PatternReader";
import Nav from "./Layout/Nav"

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element:<Editor />,
    },{
      path: "pattern",
      element: <PatternReader />
    }
  ]);

  return (
    <div className="App">
      <Nav></Nav>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
