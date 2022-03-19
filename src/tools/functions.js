function timeConverter(createdAt) {
    var respectiveDate = new Date(Date.parse(createdAt));
    var responseTime = "";
    responseTime += respectiveDate.toDateString();
    //get hoour
    var hour = respectiveDate.getHours();
    var minute = respectiveDate.getMinutes();
    // convert hour and minute into am or pm
    var ampm = hour >= 12 ? "pm" : "am";
    hour = hour % 12;
    responseTime = responseTime + " " + hour + ":" + minute + ampm;
    return responseTime;
  }

  export default timeConverter;