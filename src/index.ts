
import express from "express";
import connection from "./connection/connection.ts";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/routes.ts";

const app = express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

app.use(routes);

app.use((req, res) => {
  res.status(404).send({ success: false, message: "Not Found" });
});

const SERVER_PORT = process.env.SERVER_PORT || 3000;
(async () => {

  await connection.sync({ force: true });
  app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: ${SERVER_PORT}`);
  });


  
})();
