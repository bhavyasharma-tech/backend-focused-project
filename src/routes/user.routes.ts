import {Router} from "express"

import {createUser, getUsers, getUserById, deleteUser} from "../controllers/user.controller"
import { validateUser } from "../middlewares/validation.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorize } from "../middlewares/role.middleware";

const router= Router();

router.post("/",validateUser,createUser);
router.get("/",getUsers);
router.get("/:id",getUserById);
router.delete("/:id",authMiddleware,authorize("admin"),deleteUser)

export default router;