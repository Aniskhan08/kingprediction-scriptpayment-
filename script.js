const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/payment-confirmation', async (req, res) => {
    const { amount, upi_id } = req.body;

    // Send the payment details to your Telegram Bot
    const botToken = '7598849142:AAEh8RaN9PNQ6Wr2uHRfbj0g6Tp2VgOwsAk';  // Your Bot Token
    const chatId = '6598261234';  // Your Chat ID

    const message = `Payment Received: ₹${amount} from UPI ID: ${upi_id}`;

    try {
        await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            chat_id: chatId,
            text: message
        });
        res.status(200).send('Payment notification sent');
    } catch (error) {
        console.error('Error sending message to Telegram:', error);
        res.status(500).send('Error notifying payment');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});