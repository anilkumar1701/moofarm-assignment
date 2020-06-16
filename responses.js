
function actionCompleteResponse(res, data, msg) {
    var response = {
    message: msg || "Successful",
    status : 200,
    data   : data || {}
  };
  
  res.send(JSON.stringify(response));
}

function somethingWentWrongError(res) {
    var response = {
      message: "Something went wrong. Please try again later",
      status : 500,
      data   : {}
    };
    res.send(JSON.stringify(response));
  }

  function balanceCheck(res) {
    var response = {
      message: "User doesn't have sufficient balance",
      status : 500,
      data   : {}
    };
    res.send(JSON.stringify(response));
  }

exports.actionCompleteResponse            = actionCompleteResponse;
exports.somethingWentWrongError            = somethingWentWrongError;
exports.balanceCheck                      = balanceCheck;

