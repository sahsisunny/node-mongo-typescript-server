import express from "express";
import { merge } from "lodash";

import { getUserBySessionToken } from "../models/user";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["MOONWALKER-AUTH"];

    if (!sessionToken) {
      return res.status(401).send({
        message: "Not authenticated",
      });
    }

    const userExist = await getUserBySessionToken(sessionToken);
    if (!userExist) {
      return res.status(401).send({
        message: "Not authenticated",
      });
    }

    merge(req, { identity: userExist });

    return next();
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      message: "Not authenticated",
    });
  }
};
