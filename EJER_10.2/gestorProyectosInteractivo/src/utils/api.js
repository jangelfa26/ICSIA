let projects = [
  { id: 'p1', title: 'Desarrollo de la Aplicación Móvil', description: 'Creación de una aplicación móvil para iOS y Android.' },
  { id: 'p2', title: 'Diseño de la Nueva Web Corporativa', description: 'Rediseño completo del sitio web principal de la empresa.' },
];

let tasks = [
  { id: 't1', projectId: 'p1', title: 'Diseñar interfaz de usuario', completed: false },
  { id: 't2', projectId: 'p1', title: 'Implementar autenticación de usuario', completed: false },
];

export function getProjects() {
  return projects;
}

export function getProject(id) {
  return projects.find(p => p.id === id);
}

export function getTasksByProject(projectId) {
  return tasks.filter(t => t.projectId === projectId);
}

export function createProject({ title, description }) {
  const id = 'p' + (projects.length + 1);
  const project = { id, title, description };
  projects.push(project);
  return project;
}

export function deleteProject(id) {
  projects = projects.filter(p => p.id !== id);
  tasks = tasks.filter(t => t.projectId !== id);
}

export function createTask({ projectId, title }) {
  const id = 't' + (tasks.length + 1);
  const task = { id, projectId, title, completed: false };
  tasks.push(task);
  return task;
}

export function toggleTask(id) {
  const task = tasks.find(t => t.id === id);
  if (task) task.completed = !task.completed;
  return task;
}

export function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
}
