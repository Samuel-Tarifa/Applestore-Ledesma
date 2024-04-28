import db from "../db.js";

const iPhoneModelController = {
  getAll: async (req, res) => {
    try {
      const categories = await db.iphoneModel.findMany();
      res.json(categories);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const newCategory = await db.iphoneModel.create({ data: req.body });
      res.json(newCategory);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  },
};

export default iPhoneModelController;
