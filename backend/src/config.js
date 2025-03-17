<<<<<<< HEAD
import dotenv from "dotenv";

dotenv.config();

export const config = {
    db:{
        URI: process.env.DB_URI
    },
    server:{
        port: process.env.PORT
    },
};


    
=======
export const config = {
    PORT:4000,
    MONGO_URI: "mongodb://127.0.0.1:27017/zgasdb"
}
>>>>>>> 12b3f33c28314c4eac131a9154665a653950e7a7
