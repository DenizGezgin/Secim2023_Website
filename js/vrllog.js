 
// The reporter object encapsulating the WebSocket
const vrllogger = {
  uuid: null,
  ipaddr: null,
  url: null,
  code: null,
 
  init: function() {
    this.id = "secim2023site";
    this.url = "https://vrllab.sabanciuniv.edu/api/collect/";
    this.uuid = Date.now().toString(36) + Math.random().toString(36).substring(2);
    $.getJSON('https://api.ipify.org?format=json', function(data){
      this.ipaddr = data;
    });
  },
 
  event: function(eventCode, message) {
    let logdata = {
      "app-id":this.id, 
      "data":{"event_type": eventCode, "message": message},
      "meta":{
        "id": this.uuid,
        "url": window.location.href,
        "ip": this.ipaddr,
        "ts": Math.floor(Date.now() / 1000)
      }
    }

    //$.post(this.url, logdata, function(result){console.log(result)});

    $.ajax({
            url: this.url,
            type: "POST",
            crossDomain: true,
            data: JSON.stringify(logdata),
            contentType: "application/json; charset=utf-8"
        });

    var message = JSON.stringify(logdata);
    console.log(logdata);
  }
};
 
// Start logger immediately
vrllogger.init();
