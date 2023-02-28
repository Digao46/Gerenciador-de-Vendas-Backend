import { Response } from "express";
import { SaleModel } from "../database/models/SaleModel";

import { RequestApp } from "../interfaces/Request";

class SaleController {
  async getSales(req: RequestApp, res: Response) {
    try {
      const response = await SaleModel.findAll();

      response.sort((a: any, b: any) => b.createdAt.date - a.createdAt.date);

      let sales: any[];

      let user = JSON.parse(JSON.stringify(req.user));

      if (user.data.isAdmin) {
        sales = response;
      } else {
        let anySales = JSON.parse(JSON.stringify(response));

        const salesFiltered = anySales.filter(
          (sale: any) => sale.idSeller === user.id
        );

        sales = salesFiltered;
      }

      res.status(200).json({ sales });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar as vendas!" });
    }
  }

  async getSalesOpened(req: RequestApp, res: Response) {
    try {
      const response = await SaleModel.findAll({
        where: { saleStatus: false },
      });

      response.sort((a: any, b: any) => b.createdAt.date - a.createdAt.date);

      let sales: any[];

      let user = JSON.parse(JSON.stringify(req.user));

      if (user.data.isAdmin) {
        sales = response;
      } else {
        let anySales = JSON.parse(JSON.stringify(response));

        const salesFiltered = anySales.filter(
          (sale: any) => sale.idSeller === user.id
        );

        sales = salesFiltered;
      }

      res.status(200).json({ sales });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar as vendas!" });
    }
  }

  async updateSale(req: RequestApp, res: Response) {
    const { saleStatus } = req.body;

    try {
      await SaleModel.update(
        {
          saleStatus: saleStatus,
        },
        {
          id: req.params.id,
        }
      );
      res.status(200).json({ message: "Venda encerrada!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível encerrar a venda!" });
    }
  }

  async getSaleById(req: RequestApp, res: Response) {
    try {
      const sale = await SaleModel.findOne({ id: req.params.id });

      res.status(200).json({ sale });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar a venda!" });
    }
  }

  async addSale(req: RequestApp, res: Response) {
    try {
      const { products, quantity, total, idSeller, idClient, saleStatus } =
        req.body;
      let date = Date.now();

      SaleModel.create({
        products: products,
        quantity: quantity,
        total: total,
        idSeller: idSeller,
        idClient: idClient,
        saleStatus: saleStatus,
        createdAt: { date: date },
      });

      res.status(200).json({ message: "Venda concluída!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível concluir a venda!" });
    }
  }

  async deleteSale(req: RequestApp, res: Response) {
    try {
      await SaleModel.destroy({
        id: req.params.id,
      });

      res.status(200).json({ message: "Venda excluída! Atualize a página" });

      return;
    } catch (err) {
      res.status(400).json({ message: "Não foi possível excluir a venda!" });
    }
  }
}

export default new SaleController();
