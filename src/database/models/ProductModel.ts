import { defineModel, DataTypes } from "firestore-sequelize";

export const ProductModel = defineModel("storage", {
  name: {
    type: DataTypes.STRING,
    required: true,
  },
  sellPrice: {
    type: DataTypes.NUMBER,
    required: true,
  },
  costPrice: {
    type: DataTypes.NUMBER,
    required: true,
  },
  storage: {
    type: DataTypes.NUMBER,
    required: true,
  },
  createdAt: {
    type: DataTypes.OBJECT,
    required: true,
  },
});
