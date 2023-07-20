import sequel from "./database/sequelize";
import server from "./server";

sequel.connect();
// sequel.sync([User, Todo]);
server();
