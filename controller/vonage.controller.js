const Vonage = require("@vonage/server-sdk");
require("dotenv").config();
const path = require("path");
exports.vonageCall = async (req, res) => {
  const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APP_ID,
    privateKey: path.join(__dirname, "../private.key"),
  });

  vonage.calls.create(
    {
      to: [
        {
          type: "phone",
          number: process.env.NUMBER,
        },
      ],
      from: {
        type: "phone",
        number: process.env.NUMBER,
      },
      ncco: [
        {
          action: "talk",
          text: req.body.message,
          voiceName: "Conchita",
        },
      ],
    },
    (error, response) => {
      if (error) {
        console.error(error);
        return res.status(400).json(error);
      }
      if (response) {
        console.log(response);
        return res.status(200).json(response);
      }
    }
  );
};

exports.vonageSMS = async (req, res) => {
  const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
  });
  const from = "Vonage APIs";
  const to = process.env.NUMBER;
  const text = req.body.message;

  vonage.message.sendSms(from, to, text, (err, responseData) => {
    if (err) {

        console.log(err);
        
        return res.status(400).json(err);
    } else {
        if(responseData.messages[0]['status'] === "0") {
            console.log("Mensaje enviado");
            return res.status(200).json({message: 'Mensaje enviado correctamente'})
        } else {
          
            console.log(`Mensaje fallido, error: ${responseData.messages[0]['error-text']}`);
            return res.status(400).json({message: 'Mensaje fallido, error: '+responseData.messages[0]['error-text']})
        }
    }
})
};
