import moment from "moment";

module.exports = (sequelize, DataTypes) => {
  const classroom = sequelize.define(
    "Classroom",
    {
      id: {
        type: DataTypes.BIGINT(10).UNSIGNED,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        comment: "主键"
      },
      grade: {
        type: DataTypes.TINYINT(3).UNSIGNED,
        allowNull: false,
        comment: "年段"
      },
      prom: {
        type: DataTypes.TINYINT(3).UNSIGNED,
        allowNull: false,
        comment: "班级"
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
        comment: "更新时间"
      }
    },
    {
      timestamps: false,
      tableName: "Classroom"
    }
  );

  return classroom;
};
