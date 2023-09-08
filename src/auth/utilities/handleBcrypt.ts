import * as bcrypt from 'bcryptjs';

const saltOrRounds = 10;
async function plainToHash (passwordPlain: string): Promise<string> {
    const hash = await bcrypt.hash(passwordPlain, saltOrRounds);
    return hash;
}

async function comparePlainToHash (plain : string, hash : string) : Promise<string> {
    return await bcrypt.compare(plain, hash);
}

export { plainToHash, comparePlainToHash };