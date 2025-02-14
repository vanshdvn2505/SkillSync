import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from "cookie-parser";
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQLServer from './graphql/index.js';
import UserService from './services/user.js';
import { createServer } from 'http';

dotenv.config();

const init = async () => {
    const PORT = Number(process.env.PORT) || 5000;

    const app = express();
    app.use(
      cors({
        origin: "http://localhost:3000",
        credentials: true,
        methods: "GET,POST,PUT,DELETE,OPTIONS",
        allowedHeaders: "Content-Type,Authorization",
      })
    );
    app.options("*", cors());
    app.use(express.json());
    app.use(cookieParser()); 
    

    
    app.get('/', (req, res) => {
        res.send("Server is Running"); 
    })

    const httpServer = createServer(app);

    const { gqlServer } = await createApolloGraphQLServer(httpServer);
  
    app.use('/graphql',
        expressMiddleware(gqlServer, {
            context: async ({ req, res }) => {
        const token = req.cookies?.token;
        let user = null;
        if (token) {
          try {
            user = UserService.decodeJWTToken(token);
          } catch (err) {
            console.error('Token decoding failed:', err);
          }
        }
        return { req, res, user };
      },
          }) as unknown as (req: Request, res: Response, next: NextFunction) => void);

    httpServer.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 WebSocket running on ws://localhost:${PORT}/graphql`);
    })
}

init();