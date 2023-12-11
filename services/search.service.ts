import prisma from "./prisma.service"

export const searchSpamOrderedByName = async (name:string) => {
    try {
        var data1 = await prisma.spam.findMany({
            where: {
                name : { startsWith: name}
            }
        })
        var data2 = await prisma.spam.findMany({
            where: {
                name : { contains: name },
                NOT: {
                    name : {startsWith: name}
                }
            }
        })
        return data1.concat(data2)
    } catch (error) {
        console.log(error)
        return 
    }
}

export const searchSpamOrderedByNumber = async (phoneNumber:string) => {
    try {
        var data: any = await prisma.user.findFirst({
            where: {
                phoneNumber: phoneNumber 
            }
        })
        var check = await prisma.spam.findFirst({
            where: {
                phoneNumber: phoneNumber
            }
        })
        
        if (data) {
            if (check){
                return data
            }
        }
        if (!data) {
            data = prisma.spam.findMany({
                where: {
                    numberWithoutCountryCode: phoneNumber
                }
            })
            return data
        }
    } catch (error) {
        console.log(error)
    }
}