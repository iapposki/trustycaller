import { Request, Response } from "express";
import {searchSpamOrderedByName, searchSpamOrderedByNumber} from '../services/search.service';

export const searchSpamByName = async (req: Request, res: Response) => {
    var {name} = req.query;
    name = name as string;
    if (!name) {
        res.status(404).json({msg: "Please provide a name."}) 
    }else {
        var data = await searchSpamOrderedByName(name);
        res.status(201).json({msg: data})
    }
}

export const searchSpamByNumber = async (req: Request, res: Response) => {
    var {spamNumber} = req.query;
    spamNumber = spamNumber as string;
    if (!spamNumber) {
        res.status(404).json({msg: "Please provide a number"})
    } else {
        var data = await searchSpamOrderedByNumber(spamNumber);
        res.status(201).json({msg: data})
    }
}