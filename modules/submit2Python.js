var zmq = require('zmq');

function sendMsg2Py(msg, callback, res) 
{
    var requester = zmq.socket('req');
    requester.on("message", function(reply) 
    {
      callback(res, reply.toString());
      requester.close();
      //process.exit(0);
    });
    requester.connect("tcp://localhost:5556");
    requester.send(msg);
}

module.exports.sendMsg2Py = sendMsg2Py;
