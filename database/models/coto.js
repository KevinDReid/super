module.exports = function (sequelize, dataTypes) {
  let alias = "Coto";

  let cols = {
    id_product: {
      autoIncrement: true,
      primaryKey: true,
      type: dataTypes.INTEGER,
    },
    name: {
      type: dataTypes.STRING,
      unique: true,
    },
    section: {
      type: dataTypes.INTEGER,
    },
    price: {
      type: dataTypes.STRING,
    },
    hasDiscount: {
      type: dataTypes.BOOLEAN,
      defaultValue: false,
    },
    discountPrice: {
      type: dataTypes.STRING,
    },
    hasWeirdPromo: {
      type: dataTypes.BOOLEAN,
    },
    url: {
      type: dataTypes.STRING,
    },
    img: {
      type: dataTypes.STRING,
    },
    alt: {
      type: dataTypes.STRING,
    },
  };

  let config = {
    tableName: "coto",
    timestamps: true,
    underscored: false,
  };

  let Post = sequelize.define(alias, cols, config);

  return Post;
};
