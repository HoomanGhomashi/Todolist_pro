import React, { useState, useEffect } from 'react';
import '../styles/TodoPageStyle.css';
import { useAuth } from '../context/AuthContext';

interface Task {
  id: number;
  title: string;
  date: string;
  explanation: string;
}

const TodoPage: React.FC = () => {
  const { user } = useAuth();
  const TASKS_KEY = user ? `todoPageTasks_${user.email}` : '';
  const FORM_TITLE_KEY = user ? `todoFormTitle_${user.email}` : '';
  const FORM_DATE_KEY = user ? `todoFormDate_${user.email}` : '';
  const FORM_EXPLANATION_KEY = user ? `todoFormExplanation_${user.email}` : '';

  // --- Initialisation des états à partir du localStorage ---

  // Charge les tâches sauvegardées ou un tableau vide
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(TASKS_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // Charge le contenu du formulaire sauvegardé pour chaque champ
  const [title, setTitle] = useState(() => localStorage.getItem(FORM_TITLE_KEY) || '');
  const [date, setDate] = useState(() => localStorage.getItem(FORM_DATE_KEY) || '');
  const [explanation, setExplanation] = useState(() => localStorage.getItem(FORM_EXPLANATION_KEY) || '');

  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [expandedTaskId, setExpandedTaskId] = useState<number | null>(null);

  // --- Sauvegarde des états dans le localStorage à chaque modification ---

  // Sauvegarde la liste des tâches
  useEffect(() => { 
    if (user && TASKS_KEY) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    }
  }, [tasks, user, TASKS_KEY]);

  // Sauvegarde chaque champ du formulaire individuellement
  useEffect(() => { if (user && FORM_TITLE_KEY) localStorage.setItem(FORM_TITLE_KEY, title); }, [title, user, FORM_TITLE_KEY]);
  useEffect(() => { if (user && FORM_DATE_KEY) localStorage.setItem(FORM_DATE_KEY, date); }, [date, user, FORM_DATE_KEY]);
  useEffect(() => { if (user && FORM_EXPLANATION_KEY) localStorage.setItem(FORM_EXPLANATION_KEY, explanation); }, [explanation, user, FORM_EXPLANATION_KEY]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (editingTaskId !== null) {
      // Mode édition : on met à jour la tâche existante
      setTasks(tasks.map(task =>
        task.id === editingTaskId ? { ...task, title, date, explanation } : task
      ));
      alert('Tâche mise à jour !');
      setEditingTaskId(null); // On quitte le mode édition
    } else {
      // Mode ajout : on crée une nouvelle tâche
      const newTask: Task = {
        id: Date.now(), // Utilise le timestamp comme ID unique simple
        title,
        date,
        explanation,
      };
      setTasks([...tasks, newTask]);
      alert('Tâche enregistrée !');
    }

    // On vide le formulaire et le localStorage associé après ajout ou modification
    setTitle('');
    setDate('');
    setExplanation('');
    localStorage.removeItem(FORM_TITLE_KEY);
    localStorage.removeItem(FORM_DATE_KEY);
    localStorage.removeItem(FORM_EXPLANATION_KEY);
  };

  const handleEdit = (task: Task) => {
    // On passe en mode édition et on remplit le formulaire avec les données de la tâche
    setEditingTaskId(task.id);
    setTitle(task.title);
    setDate(task.date);
    setExplanation(task.explanation);
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setTitle('');
    setDate('');
    setExplanation('');
    localStorage.removeItem(FORM_TITLE_KEY);
    localStorage.removeItem(FORM_DATE_KEY);
    localStorage.removeItem(FORM_EXPLANATION_KEY);
  };

  const handleDelete = (taskId: number) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      setTasks(tasks.filter(task => task.id !== taskId));
    }
  };

  const toggleExplanation = (taskId: number) => {
    if (expandedTaskId === taskId) {
      setExpandedTaskId(null); // Si déjà ouvert, on le ferme
    } else {
      setExpandedTaskId(taskId); // Sinon, on l'ouvre
    }
  };

  return (
    <div className="todo-page">
      <div className="todo-layout">
        <div className="form-container">
          <h1>{editingTaskId ? 'Modifier la tâche' : 'Ajouter une tâche'}</h1>
          <form onSubmit={handleSubmit} className="todo-form">
            <label>
              Titre:
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
              Date:
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </label>
            <label>
              Explications:
              <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={5} required />
            </label>
            <div className="form-buttons">
              <button type="submit">{editingTaskId ? 'Mettre à jour' : 'Register'}</button>
              {editingTaskId && <button type="button" className="cancel-btn" onClick={handleCancelEdit}>Annuler</button>}
            </div>
          </form>
        </div>

        <div className="task-list-container">
          <h2>Mes Tâches</h2>
          {tasks.length === 0 ? (
            <p className="no-tasks-message">Aucune tâche pour le moment.</p>
          ) : (
            <ul className="task-list">
              {tasks.map(task => (
                <li key={task.id} className="task-item">
                  <div className="task-content">
                    <h3>{task.title} <span>(Pour le: {task.date})</span></h3>
                  <p>
                    {expandedTaskId === task.id || task.explanation.length <= 100
                      ? task.explanation
                      : `${task.explanation.substring(0, 100)}...`}
                  </p>
                  {task.explanation.length > 100 && (
                    <button onClick={() => toggleExplanation(task.id)} className="toggle-explanation-btn">
                      {expandedTaskId === task.id ? 'Voir moins' : 'Voir plus'}
                    </button>
                  )}
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)} className="edit-btn">Modifier</button>
                    <button onClick={() => handleDelete(task.id)} className="delete-btn">Supprimer</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoPage;