import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Splash from './pages/Splash';
import Home from './pages/Home';

const router = createBrowserRouter([
    {
      path: "/",
      element: <Splash />,
      errorElement: <div>Page Not Found</div>
    },
    {
      path: "/hom",
      element: <Home />,
      errorElement: <div>Page Not Found</div>
    }
]);

class App extends React.Component {
  render() {
    return (
      <RouterProvider router={router}>
      </RouterProvider>           
    );
  }
}

export default App;