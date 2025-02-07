import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQLServer from './graphql/index.js';
import UserService from './services/user.js';

dotenv.config();

const init = async () => {
    const PORT = Number(process.env.PORT) || 5000;

    const app = express();
    app.use(express.json());
    app.use(cookieParser()); 
    app.use(
        cors({
          origin: "http://localhost:3000",
          credentials: true,
          methods: "GET,POST,PUT,DELETE,OPTIONS",
          allowedHeaders: "Content-Type,Authorization",
        })
    );
    

    
    app.get('/', (req, res) => {
        res.send("Server is Running"); 
    })

    const gqlServer = await createApolloGraphQLServer();
    app.use('/graphql',
        expressMiddleware(gqlServer, {
            context: async ({ req, res }) => {
              try {
                const token = req.cookies?.token;
                if (token) {
                  const user = UserService.decodeJWTToken(token);
                  
                  return { user, req, res };
                }
                return { req, res };
              } catch (error) {
                console.error("Token decoding failed:", error);
                return { req, res };
              }
            },
          }) as unknown as (req: Request, res: Response, next: NextFunction) => void);

    app.listen(PORT, () => {
        console.log(`Server is listening on PORT: ${PORT}`);
        
    })
}

init();