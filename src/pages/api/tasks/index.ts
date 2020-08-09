import { Task } from "./[id]";
import { NextApiRequest, NextApiResponse } from "next";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  let tasks = [];

  await sequelize.sync();

  switch (method) {
    case "GET":
      tasks = await Task.findAll({ order: [["id", "DESC"]] });

      return res.json(tasks);
    case "POST":
      try {
        const { body } = req;

        if (Object.prototype.hasOwnProperty.call(body, "id")) {
          delete body["id"];
        }

        const task = await Task.create(body);

        return res.json(task);
      } catch (error) {
        return res.status(503).json({ error: error });
      }
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
