class Project {
    constructor(name, color, favorite) {
      this.name = name;
      this.color = color;
      this.favorite = favorite;
      this.tasks = [];
    }

    changeName(newName) {
      this.name = newName;
    }
  
    changeColor(newColor) {
      this.color = newColor;
    }
  
    changeFavorite(newFavorite) {
      this.favorite = newFavorite;
    }
  }

class Task {
  constructor(title, description, dueDate, priority, projectId) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.notes = [];
    this.projectId = projectId;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }

  changeDescription(newDescription) {
    this.description = newDescription;
  }

  changeDueDate(newDueDate) {
    this.dueDate = newDueDate;
  }

  changePriority(newPriority) {
    this.priority = newPriority;
  }
}

class Note {
    constructor(note, taskId) {
        this.note = note;
        this.taskId = taskId;
    }
}

const fileId = (() => {
    let usedIDs = [];

    const generateId = () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
        let randomId = '';

        function placeCharacters() {
            for (let i = 0; i < 8; i++) {
                const randomIndex = Math.floor(Math.random() * characters.length);
                randomId += characters.charAt(randomIndex);
            }
        }

        placeCharacters();

        if(usedIDs.includes(randomId)) {
            randomId = '';
            placeCharacters();
        };

        usedIDs.push(randomId);
        return randomId;
    }

    const removeId = (id) => {
        const index = usedIDs.indexOf(id);
        usedIDs.splice(index, 1);
    }

    return { generateId, removeId, usedIDs }
})();

const projectManager = (() => {
    let projects = [];

    const createProject = (name, color, favorite) => {
        const project = new Project(name, color, favorite);
        project.id = fileId.generateId();
        projects.push(project);
    }

    return { projects, createProject}
})();

const taskManager = (() => {
    let tasks = [];

    const createTask = (title, description, dueDate, priority, projectId) => {
        const task = new Task(title, description, dueDate, priority, projectId);
        task.id = fileId.generateId();
        tasks.push(task);
    }

    return { tasks, createTask }
})();

const noteManager = (() => {
    let notes = [];

    const createNote = (note, taskId) => {
        const newNote = new Note(note, taskId);
        newNote.id = fileId.generateId();
        notes.push(newNote);
    }

    return { notes, createNote }
})();

//  file remover
//  generate tasks from projectParents through projectIds
//  setup prettier