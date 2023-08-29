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
      setUser(response.data.user)
    }
  }

  useEffect(() => {
    console.log(user)
  },[user])

  const router = createBrowserRouter([
    {
      path: "/canvas",
      element:<><Nav user={user} setUser={setUser}></Nav><Editor/></>
    },{
      path: "/pattern",
      element:<><Nav user={user} setUser={setUser}></Nav><PatternReader user={user} /></>
    },{
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
