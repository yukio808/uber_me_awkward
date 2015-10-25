module.exports = function(sequelize, DataTypes) {
  var RequestRide = sequelize.define("RequestRide", {
    product_id : DataTypes.CHAR(36),
    start_latitude : DataTypes.DECIMAL(10, 6),
    end_latitude : DataTypes.DECIMAL(10, 6),
    start_longitude : DataTypes.DECIMAL(10, 6),
    end_longitude : DataTypes.DECIMAL(10, 6),
    access_token : DataTypes.TEXT
  }, {
    tableName : "request_ride",
    underscored : true,
    classMethods : {
    }
  });

  return RequestRide;
};