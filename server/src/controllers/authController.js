import db from "../db.js";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

import { SALT, Role,TOKEN_DURATION } from "../configs/auth.js";

const authController = {
  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await db.user.findUnique({ where: email });

    if (!user) {
      return res
        .status(400)
        .json({ error: { ok: false, message: "Credenciales invalidas" } });
    }

    const isMatch = bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ error: { ok: false, message: "Credenciales invalidas" } });
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JSON_TOKEN_SECRET,
      { expiresIn: TOKEN_DURATION }
    );

    res.json({
      ok: true,
      message: "Sesión iniciada correctamente",
      token,
    });
  },

  register: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: { message: "Revisa las entradas", errors: errors.array() },
      });
    }
    const { email, password, role, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, SALT);

    try {
      const user = await db.create({
        data: {
          username,
          email,
          password: hashedPassword,
          role: role || Role.USER,
        },
      });
      res
        .status(201)
        .json({ message: "Usuario creado correctamente", data: user });
    } catch (error) {
      res.status(500).json({ error });
    }
  },
};

export default authController;
