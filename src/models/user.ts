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
        comment: "班级id"
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
      tableName: "user"
    }
  );

  user.associate = db => {
    // 每个学生属于一个班级
    user.belongsTo(db.Classroom, {
      // This creates a foreign key called `classroomId` in the source model (user)
      foreignKey: "classroomId",
      // which references the `name` field from the target model (Captain).
      targetKey: "id"
    });
    // db.Classroom.hasMany(user, {
    //   foreignKey: "id",
    //   targetKey: "classroomId"
    // });
  };

  return user;
};
