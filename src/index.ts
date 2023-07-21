import Todo from "./database/models/todo.model";
import User from "./database/models/user.model";
import sequel from "./database/sequelize";
import server from "./server";

(async () => {
  await sequel.connect();
  // await sequel.sync([User, Todo]);
  server();
})();
