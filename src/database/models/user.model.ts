import { DataTypes, Model, ModelStatic } from "sequelize";
import { UserEntity } from "../../entities/user.entity";
import sequel from "../sequelize";
import Todo from "./todo.model";
const User: ModelStatic<Model<UserEntity>> = sequel.db.define("user", {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

User.hasMany(Todo, { foreignKey: "user_id" });

export default User;
