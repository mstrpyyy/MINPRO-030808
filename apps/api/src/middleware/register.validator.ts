import { Request, Response, NextFunction } from "express";
import { body, validationResult } from "express-validator";

export class Validator {
	validatorRegister = [
	body("name").notEmpty().withMessage("Name is required"),
	body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
	body("password").notEmpty().withMessage("Password is required"),

	(req: Request, res: Response, next: NextFunction) => {
		const errors = validationResult(req);
		if (!errors. isEmpty()) {
				return res.status(400).send({ errors: errors.array() });
		}
		next();
		},
	]

	validatorLogin = [
		body("email").notEmpty().withMessage("Email is required").isEmail().withMessage("Invalid email"),
		body("password").notEmpty().withMessage("Password is required"),
	
		(req: Request, res: Response, next: NextFunction) => {
			const errors = validationResult(req);
			if (!errors. isEmpty()) {
					return res.status(400).send({ errors: errors.array() });
			}
			next();
			},	
	]
}