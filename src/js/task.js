export class Task{

    static taskIdCounter = 1;


    constructor(description,important){
        this.id = Task.taskIdCounter++;
        this.description = description;
        this.completed = false;
        this.important = important === 'yes' ? true : false;
    }


    markComplete(){
        this.completed = true;
    }
    
    updateDetails(newDescription){ 
        this.description = newDescription;
        
    }

    
  toJSON() {
    return {
      id: this.id,
      description: this.description,
      completed: this.completed,
      important: this.important,
    };
  }

  static fromJSON(json) {
    if (!json) {
        console.error('Invalid JSON data:', json);
        return null; // or handle accordingly
      }
    const task = new Task(json.description, json.important ? 'yes' : 'no');
    task.id = json.id;
    task.completed = json.completed;

    Task.taskIdCounter = Math.max(Task.taskIdCounter, task.id + 1)

    return task;
  }
}


export class TaskHandler{
    
    static taskStorageIdCounter = 1;

    constructor(title, date){
        this.title = title;
        this.tasks = [];
        this.dateCreated = date || new Date();
        this.taskStorageId = TaskHandler.taskStorageIdCounter++;

          // Private variable for managing task IDs
   }

    addTask(description, important){

        const task = new Task(description, important);
        this.tasks.push(task);

        return task;
    }

    removeTask(taskId) {
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
    }

    updateTitle(newTitle){ 
        this.title = newTitle;
        
    }

    getTaskById(taskId) {
        const foundTask = this.tasks.find((task) => task.id === taskId);

        if (!foundTask) {
          console.error('Task not found with ID:', taskId);
        }
    
        return foundTask;
    }

    getTasks(){
        return this.tasks;
    }

    toJSON() {
        return {
          title: this.title,
          dateCreated: this.dateCreated,
          tasks: this.tasks.map((task) => task.toJSON()),
          taskStorageId: this.taskStorageId,
        };
      }
    
    static fromJSON(json) {
        if (!json) {
            console.error('Invalid JSON data:', json);
            return null; // or handle accordingly
          }
        const taskHandler = new TaskHandler(json.title, new Date(json.dateCreated));
        taskHandler.tasks = json.tasks.map((taskJson) => Task.fromJSON(taskJson));

        TaskHandler.taskStorageIdCounter = Math.max(TaskHandler.taskStorageIdCounter, taskHandler.taskStorageId + 1);
        return taskHandler;
      }
}


export class TaskStorage {
    constructor() {
        this.taskHandlers = [];
    }

    addTaskHandler(taskHandler){ 
        this.taskHandlers.push(taskHandler);
    }

    removeTaskHandler(taskStorageId) {
        this.taskHandlers = this.taskHandlers.filter((taskHandler) => taskHandler.taskStorageId !== taskStorageId);
    }

    getTaskHandlerById(taskStorageId) {
        return this.taskHandlers.find((taskHandler) => taskHandler.taskStorageId === taskStorageId);
    }

    getAllTaskHandlers() {
        return this.taskHandlers;
    }

    toJSON() {
        return {
          taskHandlers: this.taskHandlers.map((taskHandler) => taskHandler.toJSON()),
        };
      }
    
    static fromJSON(json) {
        if (!json) {
            console.error('Invalid JSON data:', json);
            return null; // or handle accordingly
          }
        const taskStorage = new TaskStorage();
        taskStorage.taskHandlers = json.taskHandlers.map((taskHandlerJson) => TaskHandler.fromJSON(taskHandlerJson));
        return taskStorage;
      }
}