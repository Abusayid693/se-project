import { DataSource } from "typeorm"
import {MYSQL_PASS, DB_NAME} from "./env"

const myDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    database: DB_NAME,
    logging: true,
    synchronize: true,
})

export default myDataSource