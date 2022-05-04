import axios from "axios";

// Para utilização com certificado SSL inválido
// import https from "https";
// const api = axios.create({
//   baseURL: "https://api.binx.com.br/api",
//   httpsAgent: new https.Agent({
//     rejectUnauthorized: false,
//   }),
// });

const enviroment = process.env.REACT_APP_ENVIROMENT || "development";

let baseURL =
  enviroment === "development"
    ? "http://localhost:4005/api"
    : "https://api.binx.com.br/api";

const api = axios.create({ baseURL: baseURL });

export default api;
