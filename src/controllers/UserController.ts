import { Response } from "express";
import { UserModel } from "./../database/models/UserModel";

import bcrypt from "bcrypt";

import { RequestApp } from "../interfaces/Request";

class userController {
  async getUsers(req: RequestApp, res: Response) {
    try {
      const users = await UserModel.findAll();

      users.sort((a: any, b: any) => a.createdAt.date - b.createdAt.date);

      res.status(200).json({ users });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível acessar os usuários!" });
    }
  }

  async getUserById(req: RequestApp, res: Response) {
    try {
      const user = await UserModel.findOne({ id: req.params.id });

      res.status(200).json({ user });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível acessar o usuário!" });
    }
  }

  async addUser(req: RequestApp, res: Response) {
    try {
      const { name, username, password, isAdmin, avatarObj } = req.body;

      const alreadyExists = await UserModel.findOne({
        where: { username: username },
      });

      let hashedPassword = await bcrypt.hash(password, 10);

      if (alreadyExists) {
        res.status(400).json({ message: "Nome de Usuário em Uso!" });
        return;
      } else {
        let date = Date.now();

        await UserModel.create({
          name: name,
          username: username,
          password: hashedPassword,
          isAdmin: isAdmin,
          avatar: avatarObj,
          createdAt: { date: date },
        });

        res.status(200).json({ message: "Pessoa adicionada!" });
      }
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível adicionar essa pessoa!" });
    }
  }

  async updateUser(req: RequestApp, res: Response) {
    try {
      let hashedPassword = await bcrypt.hash(req.body.password, 10);

      await UserModel.update(
        {
          name: req.body.name,
          username: req.body.username,
          password: hashedPassword,
          isAdmin: req.body.isAdmin,
        },
        {
          id: req.params.id,
        }
      );
      res.status(200).json({ message: "Usuário atualizado!" });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Não foi possível atualizar o usuário!" });
    }
  }

  async deleteUser(req: RequestApp, res: Response) {
    try {
      await UserModel.destroy({
        id: req.params.id,
      });
      res.status(200).json({ message: "Usuário excluído!" });
    } catch (err) {
      res.status(400).json({ message: "Não foi possível excluir o usuário!" });
    }
  }
}
export default new userController();
