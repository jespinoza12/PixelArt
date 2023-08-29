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
      element:<><Nav user={user} setUser={setUser}></Nav><Editor user={user} /></>
    },
    {
      path: "/canvas/:id",
      element:<><Nav user={user} setUser={setUser}></Nav><Editor user={user} /></>
    },
    {
      path: "/allCanvasses",
      element:<><Nav user={user} setUser={setUser}></Nav><Canvases getUser={user} /></>
    },
    {
      path: "/allPatterns",
      element:<><Nav user={user} setUser={setUser}></Nav><Patterns user={user}/></>
    },
    {
      path: "pattern",
      element: <><Nav user={user} setUser={setUser}></Nav><PatternReader user={user} /></>
    },
    {
      path: "pattern/:id",
      element: <><Nav user={user} setUser={setUser}></Nav><PatternReader user={user} /></>
    },
    {
      path: "/",
      element: <><Nav user={user} setUser={setUser}></Nav><p>Home</p></>
    },{
      path:"/login",
      element:<><Nav user={user} setUser={setUser}></Nav><Login setUser={setUser} /></>
    },
    {
      path:"/register",
      element:<><Nav user={user} setUser={setUser}></Nav><Register /></>
    }
  ]);

  return (
    <div className="App">
      <RouterProvider router={router} ></RouterProvider>
    </div>
  );
}

export default App;
