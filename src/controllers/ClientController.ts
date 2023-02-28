import { ClientModel } from "../database/models/ClientModel";
import { Response } from "express";

import { RequestApp } from "../interfaces/Request";

class clientController {
  async getClients(req: RequestApp, res: Response) {
    try {
      const response = await ClientModel.findAll();

      response.sort((a: any, b: any) => a.createdAt.date - b.createdAt.date);

      let clients: any[] = [];

      let user = JSON.parse(JSON.stringify(req.user));

      if (user.data.isAdmin) {
        clients = response;
      } else {
        let anyClients = JSON.parse(JSON.stringify(response));

        for (let i = 0; i < anyClients.length; i++) {
          let obj = {
            id: anyClients[i].id,
            name: anyClients[i].data.name,
            createdAt: anyClients[i].data.createdAt.date,
          };

          clients.push(obj);
        }
      }

      res.status(200).json({ clients });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível acessar os clientes!" });
    }
  }

  async getClientById(req: RequestApp, res: Response) {
    try {
      const client = await ClientModel.findOne({ id: req.params.id });

      res.status(200).json({ client });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar o cliente!" });
    }
  }

  async addClient(req: RequestApp, res: Response) {
    try {
      const { name } = req.body;

      let date = Date.now();

      ClientModel.create({
        name: name,
        createdAt: { date: date },
      });

      res.status(200).json({ message: "Cliente adicionado!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível adicionar o cliente!" });
    }
  }

  async updateClient(req: RequestApp, res: Response) {
    try {
      await ClientModel.update(
        {
          name: req.body.name,
        },
        {
          id: req.params.id,
        }
      );
      res.status(200).json({ message: "Cliente editado!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível editar o cliente!" });
    }
  }

  async deleteClient(req: RequestApp, res: Response) {
    try {
      await ClientModel.destroy({
        id: req.params.id,
      });
      res.status(200).json({ message: "Cliente excluído!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível excluir o cliente!" });
    }
  }
}

export default new clientController();
