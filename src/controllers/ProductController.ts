import { Response } from "express";
import { ProductModel } from "../database/models/ProductModel";

import { RequestApp } from "../interfaces/Request";

class productController {
  async getProducts(req: RequestApp, res: Response) {
    try {
      let response = await ProductModel.findAll();

      response.sort((a: any, b: any) => a.createdAt.date - b.createdAt.date);

      let products: any[] = [];

      let user = JSON.parse(JSON.stringify(req.user));

      if (user.data.isAdmin) {
        products = response;
      } else {
        let anyProducts = JSON.parse(JSON.stringify(response));

        for (let i = 0; i < anyProducts.length; i++) {
          let obj = {
            id: anyProducts[i].id,
            data: {
              name: anyProducts[i].data.name,
              sellPrice: anyProducts[i].data.sellPrice,
              storage: anyProducts[i].data.storage,
              createdAt: anyProducts[i].data.createdAt.date,
            },
          };

          products.push(obj);
        }
      }

      res.status(200).json({ products });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível acessar os produtos!" });
    }
  }

  async getProductById(req: RequestApp, res: Response) {
    try {
      const product = await ProductModel.findOne({ id: req.params.id });

      res.status(200).json({ product });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar o produto!" });
    }
  }

  async addProduct(req: RequestApp, res: Response) {
    try {
      const { name, sellPrice, costPrice, storage } = req.body;

      let date = Date.now();

      ProductModel.create({
        name: name,
        sellPrice: sellPrice,
        costPrice: costPrice,
        storage: storage,
        createdAt: { date: date },
      });

      res.status(200).json({ message: "Produto adicionado!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível adicionar o produto!" });
    }
  }

  async updateProduct(req: RequestApp, res: Response) {
    try {
      await ProductModel.update(
        {
          name: req.body.name,
          sellPrice: req.body.sellPrice,
          costPrice: req.body.costPrice,
          storage: req.body.storage,
        },
        {
          id: req.params.id,
        }
      );
      res.status(200).json({ message: "Produto editado!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível editar o produto!" });
    }
  }

  async deleteProduct(req: RequestApp, res: Response) {
    try {
      await ProductModel.destroy({
        id: req.params.id,
      });
      res.status(200).json({ message: "Produto excluído!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível excluir o produto!" });
    }
  }
}

export default new productController();
