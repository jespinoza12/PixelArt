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
import { useEffect, useState } from "react";
import axios from "axios";


function App() {

  axios.defaults.withCredentials = true;

  const [user,setUser] = useState({})

  useEffect(() => {
    getUser()
  },[])

  const getUser = async () => {
    const response = await axios.get("http://localhost:6969/u/user/current")
    console.log(response)
    if (response.data) {
      console.log(response.data)
    }
  }

  useEffect(() => {

  },[user])

  const router = createBrowserRouter([
    {
      path: "/canvas",
      element:<Editor user={user} />,
    },{
      path: "pattern",
      element: <PatternReader user={user} />
    },{
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
