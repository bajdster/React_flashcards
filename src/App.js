import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AddFlashcard from "./pages/AddFlashcard";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter([
  {path: "/", element: <RootLayout/>,
  children:[
    {path: "/", element: <HomePage/>},
    {path: "/add", element: <AddFlashcard/>}
  ]},
])

function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
