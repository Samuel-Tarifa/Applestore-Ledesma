import db from "../db.js";

const typesController = {
  getAll: async (req, res) => {
    try {
      const types = await db.type.findMany();
      res.json({ data: types });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
};

export default typesController;
