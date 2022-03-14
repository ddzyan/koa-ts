import moment from "moment";

module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define(
    "Admin",
    {
      id: {
        type: DataTypes.BIGINT(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "主键"
      },
      username: {
        type: DataTypes.STRING(12),
        allowNull: false,
        comment: "用户名称"
      },
      password: {
        type: DataTypes.STRING(12),
        allowNull: false,
        comment: "密码"
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue("createdAt"))
            .utc()
            .utcOffset(480)
            .format("YYYY-MM-DD HH:mm:ss");
        },
        comment: "创建时间"
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        get() {
          return moment(this.getDataValue("updatedAt"))
            .utc()
            .utcOffset(480)
            .format("YYYY-MM-DD HH:mm:ss");
        },
        comment: "创建时间"
      }
    },
    {
      timestamps: false,
      tableName: "admin"
    }
  );

  return admin;
};
