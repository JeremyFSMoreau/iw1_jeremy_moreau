var restify = require('restify');
var botbuilder = require('botbuilder');

// setup restify 

var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3980, function() {
    console.log('% bot started at %', server.name, server.url)
});

// create chat connector
var connector = new botbuilder.ChatConnector({
    appId: process.env.APP_ID,
    appPassword: process.env.APP_SECRET
});

// listening inputs
server.post('/api/messages', connector.listen());

// Reply by echoing
var bot = new botbuilder.UniversalBot(connector, function(session) {
    //session.send('You have tapped: %s | [Length: %s]', session.message.text, session.message.text.length);
    
    session.send(`You have tapped : ${session.message.text}`);
    session.send(`The type of message is :${session.message.type}`);
    bot.on('typing', function(){
        session.send("J'ai l'impression que vous essayez de me dire quelque chose...");
    });
    bot.on('conversationUpdate', function(activity){
        console.log(JSON.stringify(activity));
    });
    

    // session.send(JSON.stringify(session.dialogData));
    // session.send(JSON.stringify(session.sessionState));
    // session.send(JSON.stringify(session.conversationData));
    // session.send(JSON.stringify(session.userData));
});