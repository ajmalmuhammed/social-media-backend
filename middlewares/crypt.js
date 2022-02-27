import crypto from "crypto";
import dotenv from "dotenv";
dotenv.config();
    // var iv = 'kiamdksndn';
    // var iv =  Buffer.from(process.env['IV']);
    // var ivstring = iv.toString('hex');

    var ivstring = crypto.randomBytes(16);

    console.log(ivstring);



export async function encode(string) {
    const key = crypto.randomBytes(32);
    var cipher = crypto.createCipheriv('aes-256-cbc', key, ivstring);
    var part1 = cipher.update(string, 'utf8');
    var part2 = cipher.final();
    const encrypted = Buffer.concat([part1, part2]).toString('base64');
    return encrypted;
}

export async function decode(string) {
    const key = crypto.randomBytes(32);
    var decipher = crypto.createDecipheriv('aes-256-cbc', key, ivstring);
    var decrypted = decipher.update(string, 'base64', 'utf8');
    decrypted += decipher.final();
    return decrypted;
}


