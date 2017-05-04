express = require('express');
https = require('https');
request = require('request');
var path = require('path')
var app = express();
port = Number(process.env.PORT || 5000);
var city,text,temp,temperature;
var bot_name = "vincent"
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.join(__dirname)));
app.use(bodyParser.json());
var location = []
access_token="EAAa0iZA9oDAoBAMqL4bunYAk5nggYamt9G6xmmGf3UaPJItcxe8nJ1us4op6g73TGZA1CtASIcg3yQcJiZAub0aRuBk0mZAnNHpIB2YhgQYFqhvwzRO8sB6TtZAW39oylmO7NiZCTYswABfsL35UaYtm9SzGUDTYZAEAICDz4B32QZDZD";
app.get('/webhook', function(req, res) {
  if (req.query['hub.mode'] === 'subscribe' &&
      req.query['hub.verify_token'] === 'Vincent') {
    console.log("Validating webhook");
    res.status(200).send(req.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    res.sendStatus(403);          
  }  
});
console.log("Bahubali !")
app.post('/webhook', function (req, res) {
	var data = req.body;
	if(data.object === 'page'){
	data.entry.forEach(function(entry){
		var pageId = entry.id;
		var time = entry.time;
		entry.messaging.forEach(function(event){
		if(event.message){
			receivedMessage(event);		
		}
		
	});
});

res.sendStatus(200);
        
}
});
function receivedMessage(event){
	var message = event.message;
	var senderID = event.sender.id;
	var messageText = message.text;
	var messageAttachments = message.attachments 
	console.log(messageAttachments)
	if(messageText){
		
		sendTextMessage(senderID,"test")
	}
	
	else{
	console.log(event)
	}
}
function sendTextMessage(recID,messText){
	var messageData = {
	recipient : {
		id : recID
	},
	message: {
	text:messText	
	}
}
	console.log(messText)
	sendMessage(messageData);
}
function sendMessage(messageData){
request({
	uri: 'https://graph.facebook.com/v2.6/me/messages',
  	qs: { access_token: access_token },
    	method: 'POST',
    	json: messageData
	
},function (error,response,body){
	if(!error){
		console.log("message sent");	
	}	
});
}
app.listen(port);
