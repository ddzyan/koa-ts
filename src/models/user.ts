import moment from "moment";

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.BIGINT(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "主键"
      },
      firstName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "姓"
      },
      lastName: {
        type: DataTypes.STRING(20),
        allowNull: false,
        comment: "名"
      },
      number: {
        type: DataTypes.STRING(32),
        allowNull: false,
        comment: "学号"
      },
      classroomId: {
        type: DataTypes.BIGINT(10).UNSIGNED,
        allowNull: false,
        comment: "学号"
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
      tableName: "user"
    }
  );

  return user;
};
