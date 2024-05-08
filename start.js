import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import { server } from "./app.js";

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
