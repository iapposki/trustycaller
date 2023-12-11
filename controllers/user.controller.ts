import { Request, Response } from "express";
import { createUser, validateUsernamePassword } from "../services/user.service";
import {User} from '@prisma/client';

export const signup = async (req: Request, res: Response) => {
    // get info from request body
    const {name, email, password, confirmPassword, phoneNumber} = req.body;
    var condition = true
    if (!(name && email && password && phoneNumber && confirmPassword)) {
        res.status(400).json({ msg: 'Insufficient information' });
        condition = false;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
        res.status(400).json({ msg: 'Passwords do not match' });
        condition = false;
    }
    if (condition) {
        try {
            const tokens = await createUser({ name, email, phoneNumber}, password);
            res.status(201).json({ msg: 'User created successfully', tokens: tokens });
        } catch (error: any) {
            console.log(error.stack);
            res.status(500).json({ msg: 'Something Failed' });
        }
    }
}

export const login = async (req: Request, res: Response) => {
    const { phoneNumber, password } = req.body;
    if (!(phoneNumber && password)) {
        res.status(400).json({ msg: 'phoneNumber or password missing' });
    } else {
        try {
            const response = await validateUsernamePassword(phoneNumber, password);
            if (response && response.pass) {
                res.status(200).json({ msg: 'Login successful', token: response.token});
            } else {
                res.status(401).json({ msg: 'Invalid credentials' });
            }
        } catch (error: any) {
            console.log(error)
            res.status(500).json({ msg: 'Something Failed' });
        }
    }
}
