import sequel from "./database/sequelize";
import server from "./server";

(async () => {
  await sequel.connect();
  server.listen(process.env.PORT || 8000, () => "Your Application is running");
})();
