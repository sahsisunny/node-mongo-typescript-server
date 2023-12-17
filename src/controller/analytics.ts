import express from "express";
import { getAnalytics, createAnalytics } from "../db/analytics";

export const getAllAnalytics = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const analytics = await getAnalytics();
    return res.status(200).json({analytics});
  } catch (error) {
    console.error(error);
    return res.sendStatus(400).json({
      message: "Error retrieving analytics",
    });
  }
};

export const createNewAnalytics = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
        day,
        age,
        gender,
        features:{
            A,
            B,
            C,
            D,
            E,
            F
        }
    } = req.body;

    if (!day || !age || !gender || !A || !B || !C || !D || !E || !F) {
      return res.sendStatus(400).json({
        message: "Missing fields",
      });
    }
    

    const analytics = await createAnalytics({
        day,
        age,
        gender,
        features:{
            A,
            B,
            C,
            D,
            E,
            F,
        },});
    return res.status(200).json({analytics});
  } catch (error) {
    console.error(error);
    return res.sendStatus(400).json({
      message: "Error creating analytics",
    });
  }
};