import express from "express";

import { register, login, logout, self } from "../controller/authentication";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.get("/auth/logout", logout);
  router.get("/auth/self", self);
};
