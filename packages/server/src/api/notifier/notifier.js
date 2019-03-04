// future: move logic related to persistence layer to another layer and decouple
// the from the logic in the notifier

import emailer from "./email";
import errorMessages from "../api-messages/index";

// read from config / DB
let failureThreshold = 3;

const notifierTypes = {
  EMAIL: "EMAIL"
};

function emailNotifier() {
  let requests = [];

  return {
    setFailure: request => {
      let persistedReq = requests.find(
        req =>
          request.serviceUrl == req.serviceUrl &&
          request.httpType == req.httpType
      );
      if (persistedReq) {
        persistedReq.failureCounter++;
      } else {
        request.failureCounter = 0;
        requests.push(request);
        persistedReq = requests.find(
          req =>
            request.serviceUrl == req.serviceUrl &&
            request.httpType == req.httpType
        );
      }

      if (persistedReq.failureCounter >= failureThreshold) {
        const email = new emailer();
        email.send();
      }
    }
  };
}

// set Config
function setConfig(configModel) {}

// get Config
function getConfig(configModel) {
  configModel.find({}, (err, config) => {
    if (config[0].failureThreshold == undefined)
      throw new Error(errorMessages.failureThreshold);

    console.log("Here");
    console.log(config[0].failureThreshold);
    failureThreshold = config.failureThreshold;
  });
}

// factory for notifier
function createNotifier(type, request, configModel) {
  getConfig(configModel);
  if (type == notifierTypes.EMAIL) {
    return emailNotifier(request);
  }
}

export default {
  createNotifier,
  notifierTypes
};
