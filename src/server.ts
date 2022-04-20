import { app } from "./app";

const PORT = 3000;

app.listen(PORT, () => {
  console.info(`A aplicação esta rodando na porta ${PORT}.`);
}).on("error", (error) => {
  console.error(`Error: ${error}`);
})