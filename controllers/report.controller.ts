import { Request, Response } from "express";
import { getSpamData, spamUpdater, createSpamData } from "../services/report.service";

export const spamReport = async (req: Request, res: Response) => {
    const {phoneNumber} = req.userDetails;
    const {name = "", spamNumber, countryCode} = req.body;
    var spamData = await getSpamData(spamNumber);
    if (!spamData){
        spamData = await createSpamData(countryCode.concat(spamNumber), spamNumber, name);
    }
        try {
            if (name){
                await spamUpdater(spamData.reportedTimes, spamNumber, name);
            } else {
                await spamUpdater(spamData.reportedTimes, spamNumber)
            }
            res.status(200).json({msg: "Number added as spam"})
        } catch (error: any) {
            console.log(error);
            res.status(400).json({msg: "An error occured while ."})
        }
    }