// backend/notifications/getNotif.js
const express = require('express');
const Notifications = require('../../../schemas/notifications');
const router = express.Router();

router.post('/', async (req, res) => {
    const { email } = req.body;
    try {
        const userNotif = await Notifications.findOne({ email }); // Fetch the user's notification document
        if (!userNotif || !userNotif.notificationList.length) {
            return res
                .status(400)
                .json({ error: 'No notifications for this user' });
        }
        return res.status(200).json(userNotif); // Send the notifications as response
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
