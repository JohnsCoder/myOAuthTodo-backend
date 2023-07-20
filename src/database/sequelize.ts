import dotenv from "dotenv";
import { Model, ModelStatic, Sequelize } from "sequelize";

dotenv.config({ path: "./.env" });

class sequel {
  private squelize = new Sequelize(process.env.DATABASE_URL as string);

  get db() {
    return this.squelize;
  }

  async connect() {
    try {
      await this.squelize.authenticate();
      ("Connection has benn establiched sucessfully.");
    } catch (err) {
      (err);
    }
  }

  async sync(tables: ModelStatic<Model<any, any>>[]) {
    try {
      tables.forEach(async (model) => {
        await model.sync({ force: true });
      });
    } catch (err) {
      (err);
    }
  }
}
export default new sequel();
