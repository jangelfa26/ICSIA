import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import RootLayout from './routes/RootLayout.jsx';
import HomePage from './routes/HomePage.jsx';
import ProjectsPage, { loader as projectsLoader } from './routes/ProjectsPage.jsx';
import ProjectDetailsPage, {
  loader as projectDetailsLoader,
  action as projectActions,
} from './routes/ProjectDetailsPage.jsx';
import NewProjectPage, { action as newProjectAction } from './routes/NewProjectPage.jsx';
import NewTaskPage, { action as newTaskAction } from './routes/NewTaskPage.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'projects',
        element: <ProjectsPage />,
        loader: projectsLoader,
      },
      {
        path: 'projects/new',
        element: <NewProjectPage />,
        action: newProjectAction,
      },
      {
        path: 'projects/:projectId',
        element: <ProjectDetailsPage />,
        loader: projectDetailsLoader,
        action: projectActions, 
      },
      {
        path: 'projects/:projectId/new-task',
        element: <NewTaskPage />,
        action: newTaskAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
