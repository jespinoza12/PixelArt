import "../styles/App.scss";
import Editor from "./Editor";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import PatternReader from "./PatternReader";
import Nav from "./Layout/Nav"
import Patterns from "./Patterns";
import Canvases from "./Canvases";
import Login from "./Login";
import Register from "./Register";
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  axios.defaults.withCredentials = true;

  const [user,setUser] = useState({})

  useEffect(() => {
    setUser(getUser())
  },[])

  const getUser = async () => {
    const response = await axios.get("http://localhost:6969/u/user/current")
    if (response.data) {
      setUser(response.data.user)
    }
  }

  const router = createBrowserRouter([
    {
      path: "/canvas",
      element:<Editor user={user} />,
    },
    {
      path: "/canvas/:id",
      element:<Editor user={user} />,
    },
    {
      path: "/allCanvasses",
      element:<Canvases getUser={user} />,
    },
    {
      path: "/allPatterns",
      element:<Patterns user={user}/>,
    },
    {
      path: "pattern",
      element: <PatternReader user={user} />
    },
    {
      path: "pattern/:id",
      element: <PatternReader user={user} />
    },
    {
      path: "/",
      element: <p>Home</p>
    },{
      path:"/login",
      element: <Login setUser={setUser} user={user} />
    },
    {
      path:"/register",
      element: <Register user={user} />
    }
  ]);

  return (
    <div className="App">
      <Nav user={user}></Nav>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
