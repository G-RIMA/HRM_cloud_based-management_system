module.exports = (sequelize, Sequelize) => {
    const hr = sequelize.define("hr", {
      Name: {
        type: Sequelize.STRING
      },
      PASSWORD: {
        type: Sequelize.STRING
      },
      hr_role: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return hr;
  };