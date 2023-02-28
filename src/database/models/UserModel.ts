import { defineModel, DataTypes } from "firestore-sequelize";

export const UserModel = defineModel("users", {
  avatar: {
    type: DataTypes.OBJECT,
    required: false,
  },
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  username: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
    required: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
  createdAt: {
    type: DataTypes.OBJECT,
    required: true,
  },
});
