import API from "./API.ts";
import Task from "./Task.ts";
import User from "./User.ts";

interface Associable {
  associate(models: any): void;
}

const models = { API, Task, User } as const;
type ModelName = keyof typeof models;

(Object.keys(models) as ModelName[]).forEach((modelName) => {
  models[modelName].associate(models);
});

export { API, Task, User };
