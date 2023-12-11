import dotenv from 'dotenv';
dotenv.config();

export const config = {
    postgresURL: process.env['DATABASE_URL'] || "postgres://postgres:password@localhost:5432/mydb",
    authSecret: "ksljfoiuwoh;ljnf0928340j)(*U)IO#IU8u23ij409"
}