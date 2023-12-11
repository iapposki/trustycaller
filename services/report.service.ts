import prisma from "./prisma.service"

export const spamUpdater = async (reportedTimes: number, phoneNumber: string, name?: string) => {
    try {
        if (name) {
            await prisma.spam.update({
                where: {
                    phoneNumber: phoneNumber
                }, data: {
                    name: name,
                    reportedTimes : reportedTimes + 1
                }
            })
        } else {
            await prisma.spam.update({
                where: {
                    phoneNumber: phoneNumber
                }, data: {
                    name: name,
                    reportedTimes : reportedTimes + 1
                }
            })
        }
    } catch (error: any) {
        console.log("Something went wrong while updating spam data.")
    }
}

export const getSpamData = async (phoneNumber:string) => {
    try{
        const spamData = await prisma.spam.findUnique({
            where: {
                phoneNumber: phoneNumber
            }
        })
        return spamData;
    } catch(error) {
        console.log("Something went wrong while fetching spam data.");
        return

    }
}

export const createSpamData = async (phoneNumber:string, numberWithoutCountryCode: string, name?: string) => {
    const data = await prisma.spam.create({
        data: {
            phoneNumber: phoneNumber,
            name: name,
            numberWithoutCountryCode:numberWithoutCountryCode 
        }
    })
    return data;
}