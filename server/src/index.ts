import express, { NextFunction, Request, Response } from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { expressMiddleware } from '@apollo/server/express4';
import createApolloGraphQLServer from './graphql/index.js';

dotenv.config();

const init = async () => {
    const PORT = Number(process.env.PORT) || 5000;

    const app = express();
    app.use(express.json());
    app.use(cors());

    
    app.get('/', (req, res) => {
        res.send("Server is Running"); 
    })

    const gqlServer = await createApolloGraphQLServer();
    app.use('/graphql', expressMiddleware(gqlServer) as unknown as (req: Request, res: Response, next: NextFunction) => void);

    app.listen(PORT, () => {
        console.log(`Server is listening on PORT: ${PORT}`);
        
    })
}

init();