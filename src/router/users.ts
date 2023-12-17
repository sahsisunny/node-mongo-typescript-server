import express from "express";

import { getAllUsers } from "./../controller/users";
import { isAuthenticated } from "./../middlewares/users";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  return router;
};
