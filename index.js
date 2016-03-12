'use strict';

// const M2X = require("m2x");
const request = require("request");
const API = "http://api-m2x.att.com/v2";
const STREAM_TYPE = {
  NUMERIC : "numeric",
  ALPHANUMERIC : "alphanumeric"
};

const device_id = "3b0eaa66a0d88ade22a6af2b23378b72";

// console.log(makeStreamsEndpoint(device_id, stream_id, 'devices','value'));

var streams = [];

function createStream() {
  let new_stream_id = Math.floor(Math.random()*9999);

  request.put({
      url : makeStreamsEndpoint(device_id, new_stream_id, 'devices',''),
      json : true,
      headers : {
        "X-M2X-KEY" : process.env.M2X_APIKEY
      },
      body : {
        display_name : `task_${new_stream_id}`,
        type : STREAM_TYPE.ALPHANUMERIC
      }
    }, function(error, response, body){
      console.log('made stream', new_stream_id, error || new Date());
      console.log(body);
      if(!error) streams.push(new_stream_id);
    }
  );

}

function deleteStream() {
  let completed_stream_idx = Math.floor(Math.random()*streams.length);
  let completed_stream_id = streams[completed_stream_idx];

  request.del({
      url : makeStreamsEndpoint(device_id, completed_stream_id, 'devices',''),
      json : true,
      headers : {
        "X-M2X-KEY" : process.env.M2X_APIKEY
      }    }, function(error, response, body){
      console.log('deleted stream', completed_stream_id, error || new Date());
      console.log(body);
      if(!error) streams.splice(completed_stream_idx,1);
    }
  );

}

function hit(){
  let stream_id = streams[Math.floor(Math.random()*streams.length)];
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


function modStreams(){
  setTimeout(() =>{

    if(streams.length > 2 && Math.floor(Math.random()*2)){
      deleteStream();
    } else {
      createStream();
    }

    modStreams();
  }, Math.floor((Math.random()*500)+500)*10);
}

function makeStreamsEndpoint(device_id, stream_id, endpoint, action){
  return `${API}/${endpoint}/${device_id}/streams/${stream_id}/${action}`;
}

createStream();
createStream();
hit();
modStreams();

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
