import express from "express";
import authentication from "./authentication";
import user from "./users";
import analytics from "./analytics";

const router = express.Router();

export default (): express.Router => {
  authentication(router);
  user(router);
  analytics(router);
  return router;
};
