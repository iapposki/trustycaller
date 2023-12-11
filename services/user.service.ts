import prisma from './prisma.service';
import {Md5} from 'ts-md5';
import jwt from 'jsonwebtoken';
import {config} from '../config/index';
import {User} from "@prisma/client";

export const createUser = async (userDetails: any, password: string) => {
    await prisma.user.create({
        data: {
            ...userDetails,
            hash: Md5.hashStr(password)
        }
    });
    const token = await generateToken(userDetails.phoneNumber);
    return token
}

export const generateToken = async (
    phoneNumber: string,
    expiry: string | number = 300,
) => {
    const token = jwt.sign({phoneNumber}, config.authSecret, {
        expiresIn: expiry,
    });
    return token;
};

export const validateUsernamePassword = async (phoneNumber: string, password: string) => {
	const user: User | null = await prisma.user.findFirst({ where: { phoneNumber: phoneNumber } });
	if (user && user.hash === Md5.hashStr(password)) {
		const token = await generateToken(user.phoneNumber);
		return { pass: true, token: token };
	}
	return false;
}