import express from "express";

import {createNewAnalytics, getAllAnalytics} from "../controller/analytics";
import { isAuthenticated } from "./../middlewares/users";

export default (router: express.Router) => {
    router.get("/analytics", isAuthenticated, getAllAnalytics);
    router.post("/analytics", isAuthenticated, createNewAnalytics);
};

