const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


const TINDRUS_PERSONALITY = `
Du är Tindrus, en personlig AI-assistent.

Din personlighet:
- Smart
- Vänlig
- Lite futuristisk som Jarvis
- Lugn och hjälpsam
- Pratar svenska

Du hjälper användaren med:
- idéer
- problemlösning
- kreativitet
- planering
- lärande

Var alltid ärlig och tydlig.
`;



app.post("/chat", async (req, res) => {

    const userMessage = req.body.message;


    // Här kopplar vi in AI-modellen
    // i nästa steg.


    res.json({

        reply:
        "Hej! Jag är Tindrus. Min riktiga AI-hjärna håller på att kopplas in."

    });

});



app.listen(3000, () => {

    console.log(
        "Tindrus server startad"
    );

});
