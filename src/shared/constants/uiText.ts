export const UI_TEXT = {
  app: {
    sectionLabel: 'Todo list',
    eyebrow: 'Tasks',
    title: 'Todo List',
    loading: 'Loading tasks...',
  },
  addTodo: {
    inputLabel: 'New task title',
    placeholder: 'What needs to be done?',
    addButtonLabel: 'Add task',
    addButtonText: 'Add',
    emptyTitleError: 'Введите название задачи.',
  },
  filters: {
    groupLabel: 'Todo filters',
    ariaLabelPrefix: 'Filter tasks: ',
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  },
  todoItem: {
    markActive: 'Mark as active',
    markCompleted: 'Mark as completed',
    deleteAriaLabelPrefix: 'Delete task: ',
    deleteButtonText: 'Delete',
    completedMark: '✓',
    activeMark: '○',
  },
  emptyState: {
    title: 'No tasks yet',
    description: 'Add your first task to get started.',
  },
  errors: {
    loadTodos: 'Unable to load tasks.',
    saveTodos: 'Unable to save tasks.',
  },
} as const;
