import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './components/RootLayout';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './components/HomePage';
import TaskListPage from './components/TaskListPage';
import NewTaskPage from './components/NewTaskPage';
import ProfilePage from './components/ProfilePage';
import NotFoundPage from './components/NotFoundPage';
import './App.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          { index: true, element: <TaskListPage /> },
          { path: "new", element: <NewTaskPage /> },
          { path: "task/:taskId", element: <div>Detalles de Tarea (a implementar)</div> },
        ],
      },
      { path: "/profile", element: <ProfilePage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
