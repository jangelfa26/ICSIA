import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RootLayout from "./components/RootLayout";
import DashboardLayout from "./components/DashboardLayout";
import TaskListPage from "./components/TaskListPage";
import NewTaskPage from "./components/NewTaskPage";
import NotFoundPage from "./components/NotFoundPage";
import './App.css';

const ProfilePageLazy = React.lazy(() => import('./components/ProfilePage'));

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RootLayout />}>
        <Route index element={<h1>Bienvenido al Gestor de Tareas</h1>} />
        <Route path="dashboard" element={<DashboardLayout />}>
          <Route index element={<TaskListPage />} />
          <Route path="new" element={<NewTaskPage />} />
          <Route path="task/:taskId" element={<h1>Detalles de la Tarea</h1>} />
        </Route>
        <Route
          path="profile"
          element={
            <React.Suspense fallback={<div>Cargando perfil...</div>}>
              <ProfilePageLazy />
            </React.Suspense>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
