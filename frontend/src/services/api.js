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
    ? process.env.REACT_APP_LOCAL_API_URL
    : "https://api.binx.com.br/api";

const api = axios.create({ baseURL: baseURL, timeout: 180000 });

export default api;
