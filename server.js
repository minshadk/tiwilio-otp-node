const dotenv = require("dotenv");
const twilio = require("twilio");

dotenv.config({ path: "./config.env" });

const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const serviceId = process.env.SERVICEID;

const client = new twilio(accountSid, authToken);

const express = require("express");
const app = express();
const port = 3001;

app.get("/", (req, res) => res.send("Welcom to Verfication service!"));

app.get("/sendOtp/:phoneNumber", async (req, res) => {
  console.log("send otp is called");
  const phoneNumber = req.params.phoneNumber;

  client.verify
    .services(serviceId)
    .verifications.create({ to :phoneNumber, channel: "sms" })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
});

app.get("/verifyOtp/:phoneNumber/:otp", async (req, res) => {
  const phoneNumber = req.params.phoneNumber;
  const otp = req.params.otp;
  client.verify
    .services(serviceId)
    .verificationChecks.create({ to:phoneNumber,code: otp })
    .then((verification) => {
      res.json(verification);
    })
    .catch((err) => {
      res.json(err);
    });
});

// app.listen(port);
app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
