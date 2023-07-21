import { DataTypes, Model, ModelStatic } from "sequelize";
import { TodoEntity } from "../../entities/todo.entity";
import sequel from "../sequelize";

const Todo: ModelStatic<Model<TodoEntity>> = sequel.db.define(
  "todo",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

export default Todo;
