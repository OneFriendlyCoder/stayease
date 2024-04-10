import { PrismaClient } from "@prisma/client";

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();
if(process.env.NODE_ENV !== 'production'){
    globalThis.prisma = client                      //global prisma client is not effected by hotreload in nextjs, else many prisma client would be created
}   

export default client;