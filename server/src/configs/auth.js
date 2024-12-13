const SALT = 10;

const Role = {
  ADMIN: "ADMIN",
  USER: "USER",
};

Object.freeze(Role);

const TOKEN_DURATION = "7d";

export { Role, SALT, TOKEN_DURATION };
