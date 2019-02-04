import request from "superagent";

const createSuperAgent = function() {
  return request;
};

module.exports = {
  createSuperAgent
};
