import "../styles/App.scss";
import Editor from "./Editor";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PatternReader from "./PatternReader";
import Nav from "./Layout/Nav"
import Login from "./Login";
import Register from "./Register";

function App() {

  const router = createBrowserRouter([
    {
      path: "/canvas",
      element:<Editor />,
    },{
      path: "pattern",
      element: <PatternReader />
    },{
      path: "/",
      element: <p>Home</p>
    },{
      path:"/login",
      element: <Login />
    },
    {
      path:"/register",
      element: <Register />
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
