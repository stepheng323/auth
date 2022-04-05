// eslint-disable-next-line no-unused-vars
declare namespace Express {
    export interface Request {
        auth: {
            id: number,
            token: string
            phoneNumber: string,
            email: string
            firstName: string,
            lastName: string,
            password: string,
            isVerified: boolean,
            bvn: string | undefined | null
            isTokenized: boolean
            referalCode: string,
            firebaseToken?: string,
            hasCreditLimit?: string,
            creditLimitStatus: string
        }
        accounts: {
             id: number,
             userId: number,
             name: string,
             availableBalance: number,
             amountUsed: number
             accountType: string,
             accountNumber: string
            } [],
        billRequest: {
            reference: string,
            t: any,
            purpose: string,
            source: string,
            cardId?: number,
            balanceBefore?: number
        },
        transactionResponse: {
            success: boolean,
            result?: any,
            message: string
        }
}
}
