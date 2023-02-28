import { defineModel, DataTypes } from "firestore-sequelize";

export const ClientModel = defineModel("clients", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  createdAt: {
    type: DataTypes.OBJECT,
    required: true,
  },
});
