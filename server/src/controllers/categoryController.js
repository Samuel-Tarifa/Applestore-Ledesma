import db from "../db.js";

const categoryController = {
  getAll: async (req, res) => {
    try {
      const categories = await db.category.findMany();
      res.json({ data: categories });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newCategory = await db.category.create({ data: req.body });
      res.json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default categoryController;
