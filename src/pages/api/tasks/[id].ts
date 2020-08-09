import { NextApiRequest, NextApiResponse } from "next";

import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "db/database.sqlite",
});

export const Task = sequelize.define(
  "Task",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING(10),
    },
  },
  {}
);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  await sequelize.sync();

  const user = await Task.findOne({ where: { id: id } });
  if (!user) {
    return res.status(404).json({ error: "Task not found!" });
  }

  switch (method) {
    case "GET":
      return res.json(user);
    case "PATCH":
      try {
        const { body } = req;

        Object.keys(body).forEach((key) => {
          user.setDataValue(key, body[key]);
        });

        await user.save();
        return res.status(204).json("");
      } catch (error) {
        return res.status(503).json({ error: `Can't patch task {id: ${id}}` });
      }
    case "DELETE":
      try {
        await user.destroy();
        return res.status(204).json("");
      } catch (error) {
        return res.status(503).json({ error: `Can't remove user {id: ${id}}` });
      }
    default:
      res.setHeader("Allow", ["GET", "PUT", "PATCH", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};
