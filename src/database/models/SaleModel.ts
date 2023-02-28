import { defineModel, DataTypes } from "firestore-sequelize";

export const SaleModel = defineModel("sales", {
  products: {
    type: DataTypes.ARRAY,
    required: true,
  },
  quantity: {
    type: DataTypes.ARRAY,
    required: true,
  },
  total: {
    type: DataTypes.NUMBER,
    required: true,
  },
  idSeller: {
    type: DataTypes.STRING,
    required: false,
  },
  idClient: {
    type: DataTypes.STRING,
    required: false,
  },
  saleStatus: {
    type: DataTypes.BOOLEAN,
    required: true,
  },
  createdAt: {
    type: DataTypes.OBJECT,
    required: true,
  },
});
