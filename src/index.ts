import sequel from "./database/sequelize";
import server from "./server";

(async () => {
  await sequel.connect();
  server();
})();
