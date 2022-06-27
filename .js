
let webhook, commandName,botName;


window.addEventListener('onWidgetLoad', function (obj) {
  const fieldData = obj.detail.fieldData;
  webhook=fieldData.discordWebhook;  
  commandName=fieldData.commandName;  
  botName=fieldData.botName;    
});


window.addEventListener('onEventReceived', function (obj) {
  if (!obj.detail.event) {
    return;
  }
  const event = obj.detail.event;

  if (obj.detail.listener !== "message") return;
  var command = event["data"]["text"].split(" ")[0].toLowerCase();
  if (command != commandName) return;

  var data = obj.detail.event.data;
  var msg = event["data"]["text"].substr(event["data"]["text"].indexOf(" ") + 1);

  if(event["data"]["badges"].length > 0) //funcion unica de Twitch
    var badge = event["data"]["badges"][0]["type"]; 

  var isMod = (badge === 'subscriber' || badge === 'vip' || badge === 'moderator' || badge === 'broadcaster');  // puedes agregar mas emblemas usando ('vip' | 'subscriber')
  if (!isMod) return;

  discordMessage(webhook, msg);

  console.log(webhook + " " + botName + " " + commandName);
});

function discordMessage(webHookURL, message) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", webHookURL, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    'content': message,
    'username':botName,
  }));
}

