import express from "express";
import ProductController from "./controllers/ProductController";
import SaleController from "./controllers/SaleController";
import SignInController from "./controllers/SignInController";
import UserController from "./controllers/UserController";
import ClientController from "./controllers/ClientController";

import { authMiddleware } from "./middlewares/authMiddleware";
import { adminMiddleware } from "./middlewares/adminMiddleware";

export const routes = express.Router();

// Rotas de Login
routes.post("/login", SignInController.signIn);

// Rotas dos Produtos
routes.get("/storage", authMiddleware, ProductController.getProducts);

routes.get("/storage/:id", authMiddleware, ProductController.getProductById);

routes.post(
  "/newProduct",
  authMiddleware,
  adminMiddleware,
  ProductController.addProduct
);

routes.put(
  "/editProduct/:id",
  authMiddleware,
  adminMiddleware,
  ProductController.updateProduct
);

routes.delete(
  "/storage/:id",
  authMiddleware,
  adminMiddleware,
  ProductController.deleteProduct
);

// Rotas das Vendas
routes.get("/sales", authMiddleware, SaleController.getSales);

routes.get("/cash", authMiddleware, adminMiddleware, SaleController.getSales);

routes.get(
  "/salesOpened",
  authMiddleware,
  SaleController.getSalesOpened
);

routes.put(
  "/sales/:id",
  authMiddleware,
  SaleController.updateSale
);

routes.get("/sales/:id", authMiddleware, SaleController.getSaleById);

routes.delete(
  "/sales/:id",
  authMiddleware,
  adminMiddleware,
  SaleController.deleteSale
);

routes.get("/newSale", authMiddleware, ProductController.getProducts);

routes.post("/newSale", authMiddleware, SaleController.addSale);

routes.put("/newSale/:id", authMiddleware, ProductController.updateProduct); // Editar estoque ao finalizar a venda

// Rotas dos Usuários
routes.get("/users", authMiddleware, UserController.getUsers);

routes.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  UserController.getUserById
);

routes.post(
  "/newUser",
  authMiddleware,
  adminMiddleware,
  UserController.addUser
);

routes.put(
  "/editUser/:id",
  authMiddleware,
  adminMiddleware,
  UserController.updateUser
);

routes.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  UserController.deleteUser
);

// Rotas dos Clientes

routes.get("/clients", authMiddleware, ClientController.getClients);

routes.get(
  "/clients/:id",
  authMiddleware,
  adminMiddleware,
  ClientController.getClientById
);

routes.post(
  "/newClient",
  authMiddleware,
  ClientController.addClient
);

routes.put(
  "/editClient/:id",
  authMiddleware,
  adminMiddleware,
  ClientController.updateClient
);

routes.delete(
  "/clients/:id",
  authMiddleware,
  adminMiddleware,
  ClientController.deleteClient
);
