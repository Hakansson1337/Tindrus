const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

let memory = JSON.parse(localStorage.getItem("tindrusMemory")) || [];
let conversation = JSON.parse(localStorage.getItem("tindrusChat")) || [];


function addMessage(text, sender) {

    const div = document.createElement("div");

    div.className = "message " + sender;
    div.innerText = text;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}


function saveChat(role, text) {

    conversation.push({
        role: role,
        text: text
    });

    localStorage.setItem(
        "tindrusChat",
        JSON.stringify(conversation)
    );
}


function saveMemory(text) {

    memory.push(text);

    localStorage.setItem(
        "tindrusMemory",
        JSON.stringify(memory)
    );
}


async function sendMessage() {

    let message = input.value.trim();

    if (!message) return;


    addMessage(message, "user");

    saveChat("user", message);

    input.value = "";


    let thinking = document.createElement("div");

    thinking.className = "message tindrus";
    thinking.innerText = "Tindrus tänker...";

    chat.appendChild(thinking);


    try {

        // Här kopplar vi in den riktiga AI:n i nästa steg
        let response = await askTindrus(message);


        thinking.remove();


        addMessage(response, "tindrus");

        saveChat("tindrus", response);

        speak(response);


    } catch(error) {

        thinking.remove();

        addMessage(
            "Jag kunde inte nå min AI-hjärna just nu. Försök igen.",
            "tindrus"
        );

    }

}



async function askTindrus(message) {


    // Tillfällig hjärna tills vi kopplar AI-servern

    let text = message.toLowerCase();


    if(text.includes("vem är du")) {

        return "Jag är Tindrus, din personliga AI-assistent. Jag är byggd för att hjälpa dig med idéer, problemlösning och skapande.";

    }


    if(text.includes("kom ihåg")) {

        saveMemory(message);

        return "Jag har sparat det i mitt lokala minne.";

    }


    return "Jag är redo att hjälpa dig. Min avancerade AI-hjärna håller på att kopplas in.";
}



function speak(text) {

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "sv-SE";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);

}



function startVoice() {

    const Recognition =
    window.SpeechRecognition ||
    window.webkitSpeechRecognition;


    if(!Recognition){

        alert("Röst stöds inte här.");

        return;

    }


    let recognition = new Recognition();

    recognition.lang = "sv-SE";


    recognition.onresult = function(event){

        input.value =
        event.results[0][0].transcript;

        sendMessage();

    };


    recognition.start();

}


// Visa tidigare chatt
conversation.forEach(msg => {

    addMessage(
        msg.text,
        msg.role === "user" ? "user" : "tindrus"
    );

});
