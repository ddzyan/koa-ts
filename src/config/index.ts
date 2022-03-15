import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  port: parseInt(process.env.PORT, 10),
  sequelize: {
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    options: {
      dialect: "mysql",
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      timezone: "+08:00",
      query: {
        raw: true
      },
      sync: { force: false }, // 开启，则每次将强制同步表结构（删除后重新创建）
      logging: (sql: string, timing: number) => {
        if (typeof timing === "number" && timing > 5000) {
          console.warn(`[sequelize](${timing} ms) ${sql}`);
        }
      },
      poll: {
        max: 10,
        min: 5,
        acquire: 60000,
        idle: 30000
      },
      define: {
        underscored: true,
        freezeTableName: true,
        charset: "utf8mb4",
        engine: "innodb",
        dialectOptions: {
          collate: "utf8mb4_general_ci",
          connectTimeout: 30000,
          dateStrings: true,
          typeCast: true
        },
        timestamps: true
      }
      // isolationLevel: Transaction.ISOLATION_LEVELS.REPEATABLE_READ,
      // operatorsAliases: false,
    }
  },
  logs: {
    level: process.env.LOG_LEVEL || "silly"
  }
};
