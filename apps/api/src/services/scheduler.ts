import prisma from "@/prisma"

export const pointScheduler = async() => {
    try {
        await prisma.pointUser.updateMany({
            where: {
                expireAt: {
                    lt: new Date()
                }
            },
            data: {
                isRedeem: true
            }
        });
        await prisma.user.updateMany({
            where: {
                RedeemExpire: {
                    lt: new Date()
                }
            },
            data: {
                isRedeem: true
            }
        })
    } catch (error) {
        console.log(error);
    }
}