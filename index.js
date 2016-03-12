// const M2X = require("m2x");
const request = require("request");
const API = "http://api-m2x.att.com/v2";

// const m2x = new M2X(process.env.M2X_APIKEY);

const device_id = "3b0eaa66a0d88ade22a6af2b23378b72";

const stream_id = "mm_pi";

// console.log(makeStreamsEndpoint(device_id, stream_id, 'devices','value'));

function hit(){
  setTimeout(() =>{

    request.put({
        url : makeStreamsEndpoint(device_id, stream_id, 'devices','value'),
        json : true,
        headers : {
          "X-M2X-KEY" : process.env.M2X_APIKEY
        },
        body : {
          value : JSON.stringify({
            user : ["jon","brandon","kelli","brad"][Math.floor(Math.random()*4)],
            status : Math.floor(Math.random()*5)
          })
        }
      }, function(error, response, body){
        console.log(error || new Date());
        console.log(body);
      }
    );
    hit();
  }, Math.floor((Math.random()*500)+100)*10);
}

hit();

function makeStreamsEndpoint(device_id, stream_id, endpoint, action){
  return `${API}/${endpoint}/${device_id}/streams/${stream_id}/${action}`;
}

// m2x.devices.view(device_id, function(response) {
//     console.log(response.json);
// });

// m2x.devices.streams(device_id, function(response) {
//     console.log(response.json);
// });



// https://m2x.att.com/developer/documentation/v2/device#Create-Update-Data-Stream
// id, name, params, callback
// m2x.devices.updateStream(device_id, "mm_test",
//                          {
//                            value : "40"
//                            // {
//                            //   mm_test : 40
//                            // }
//                              // user : "jon",
//                              // status : Math.floor(Math.random()*5)
//                            // }
//                          },
//                          function(response) {
//     console.log(response.json);
// });
