import { connect } from "mongoose";

(async () => {
  try {
    const db = await connect(
      "mongodb://julio:Julio2022@172.27.2.249:27017/appj"
    );
    console.log("DB conectada a", db.connection.name);
  } catch (error) {
    console.error(error);
  }
})();
