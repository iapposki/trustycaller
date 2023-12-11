import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

declare global {
    namespace Express {
        interface Request {
            userDetails?: any
        }
    }
}


export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
    var {token=""} = req.query
    var tempTok: any = token;
    if (!tempTok){
        const tokenAuthHeader: any = req.headers["token"] 
        tempTok = tokenAuthHeader && (tokenAuthHeader as string).split(" ")[1]
    }

    if (!tempTok){
        return res.status(401).json({msg: "Token not provided"})
    }

    try {
        const {phoneNumber} = jwt.verify(tempTok, config.authSecret) as jwt.JwtPayload;
        if (req.userDetails) {
            throw new Error("Someone tried to hack.")
        }
        req.userDetails = { phoneNumber };
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            res.status(403).json({msg: "Session expired. Please login again."})
        } else {
            console.log(error);
            res.status(401).json({msg: "Unauthorized."})
        }
    }
}
