import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const PORT = Number(process.env.PORT) || 5000;
const app = express();
app.use(express.json());
app.use(cors());
app.get('/', () => {
    console.log("Server is Running");
});
app.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
});
