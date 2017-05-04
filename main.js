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
app.listen(port);
