let schedule = (SheduleClass, name, params) => {
  return new SheduleClass(name, params);
};

module.exports.schedule = schedule;
