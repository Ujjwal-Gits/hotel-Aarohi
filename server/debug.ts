import { prisma } from './src/lib/prisma';

async function test() {
    console.log('Testing connection...');
    try {
        const users = await prisma.user.findMany();
        console.log('Success! Users found:', users.length);
    } catch (e) {
        console.error('Error in test:', e);
    }
}

test();
