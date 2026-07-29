const chat = document.getElementById("chat");
const input = document.getElementById("userInput");

// Tindrus minne
let memory = JSON.parse(localStorage.getItem("tindrusMemory")) || [];

function addMessage(text, sender) {
    const div = document.createElement("div");
    div.className = "message " + sender;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function saveMemory(text) {
    memory.push(text);
    localStorage.setItem("tindrusMemory", JSON.stringify(memory));
}

function sendMessage() {

    let message = input.value.trim();

    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    setTimeout(() => {

        let response = tindrusThink(message);

        addMessage(response, "tindrus");
        speak(response);

    }, 500);
}


function tindrusThink(message) {

    let text = message.toLowerCase();


    if (text.includes("mitt namn är")) {

        let name = message.replace(/.*mitt namn är/i, "").trim();

        saveMemory("Användaren heter " + name);

        return "Trevligt att lära känna dig, " + name + ". Jag kommer ihåg det.";

    }


    if (text.includes("kom ihåg")) {

        saveMemory(message);

        return "Jag har sparat det i mitt minne.";

    }


    if (text.includes("vem är du")) {

        return "Jag är Tindrus, din personliga AI-assistent. Jag är här för att hjälpa dig med idéer, problem och skapande.";

    }


    if (text.includes("hjälp")) {

        return "Självklart. Berätta vad du behöver hjälp med så analyserar jag det och hjälper dig hitta en lösning.";

    }


    return "Jag förstår. Jag analyserar det och hjälper dig så gott jag kan. Vill du att vi utvecklar idén tillsammans?";
}



// Röstfunktion
function speak(text) {

    let speech = new SpeechSynthesisUtterance(text);

    speech.lang = "sv-SE";
    speech.rate = 1;

    window.speechSynthesis.speak(speech);

}


// Röstinmatning
function startVoice() {

    const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;


    if (!SpeechRecognition) {

        alert("Röst fungerar inte i denna webbläsare.");

        return;

    }


    let recognition = new SpeechRecognition();

    recognition.lang = "sv-SE";


    recognition.onresult = function(event) {

        input.value = event.results[0][0].transcript;

        sendMessage();

    };


    recognition.start();

}
