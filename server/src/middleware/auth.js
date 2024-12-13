import { body } from "express-validator";

import { Role } from "../configs/auth";
const validateRole = (role) => {
  return Object.values(Role).includes(role);
};

const registerValidation = [
  body("username")
    .isLength({ min: 5 })
    .withMessage("El nombre de usuario debe tener al menos 5 caracteres"),
  body("email").isEmail("Debe ser un email válido"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres"),
  body("role")
    .custom((value) => validateRole(value))
    .withMessage("Rol no válido"),
];

export { registerValidation,validateRole };
