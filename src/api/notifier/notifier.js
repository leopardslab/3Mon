import emailer from "./email";

// read from config / DB
const failureThreshold = 3;

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

function createNotifier(type, request) {
  if (type == notifierTypes.EMAIL) {
    return emailNotifier(request);
  }
}

export default {
  createNotifier,
  notifierTypes
};
