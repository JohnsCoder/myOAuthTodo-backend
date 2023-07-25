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
      type: DataTypes.TEXT,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    hooks: {
      afterCreate: (record: Model<TodoEntity, TodoEntity>) => {
        delete record.dataValues.content;
        delete record.dataValues.updatedAt;
        delete record.dataValues.createdAt;
        delete record.dataValues.user_id;
      },
    },

    freezeTableName: true,
  }
);

export default Todo;
