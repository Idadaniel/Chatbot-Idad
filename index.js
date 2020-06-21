console.log("I just started");
let context = 'dialogflow';
const timer = document.getElementById("time");

timer.innerText = new Date().toLocaleTimeString();

const createBotMessage = (messages) => {
    let body = "";
    messages.forEach((ms, i) => {
        body += `
        <div class="chat bot ${i == 0 ? 'first' : ''} ${i == messages.length - 1 ? '' : "more"}"> ${ms} <span>${new Date().toLocaleTimeString()}</span></div>`
    });
    return body;
};

const sendBot = (messages) => {
    const chatBody = document.getElementById('chat-body');
    const messageBody = createBotMessage(messages);
    chatBody.innerHTML += messageBody;
    chatBody.scrollTop = chatBody.scrollHeight;
}

sendBot([
    "Welcome! I am Idad",
    "How may I help you?"
    //  "Please reply with your name if you so want to be addressed or say skip"
]

);

const createUserMessage = (message) => {
    return `<div class="chat user"> ${message} <span>${new Date().toLocaleTimeString()}</span></div>`;
};

const sendUser = (message) => {
    const chatBody = document.getElementById('chat-body');
    const messageBody = createUserMessage(message);
    chatBody.innerHTML += messageBody;
    chatBody.scrollTop = chatBody.scrollHeight;

}

const callBotApi = (value) => {
    fetch("https://dialogflow.googleapis.com/v2/projects/faq-kyxebb/agent/sessions/defbc128-9049-91e4-e58f-6a7da0d291d3:detectIntent", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer ya29.c.KpYB0AehskR8eHWB0z18bqCGhAwT0HMqx10_6gkV7_RLcWSM5SqUZQejO03XbnYvCto_FpSd6CqxHnDugpGSGXbEPM-oxsoPgSUn1FYMgZVAJBMPx_dsrqYAIxHuYLkJUvZTC4P7qjr01QdACV-3dIo8McbgcIa-evRk48I7Q4QWx54e3Rim5qPi6fLSRpxmyAx-kzuRPaWI",
        },
      
        body: JSON.stringify({
            queryInput: {
                text: {
                    text: value,
                    languageCode: "en",
                },
            },
        }),
    }).then(res => res.json()).then(data => {
        sendBot([data.queryResult.fulfillmentText]);
      });
};



const manageUserInput = (e) => {
    const keyCode = e.keyCode || e.which;
    const value = e.target.value.trim();
    if (keyCode == 13 && value.length) {

        sendUser(value);
        e.target.value = "";
        switch (context) {
            case "within":
                return;
            case "dialogflow":
                return callBotApi(value);
        }
    }
}

