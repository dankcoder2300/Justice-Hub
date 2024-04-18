const express = require('express');
const Case = require('../models/Case');

const router = express.Router();

router.get('/upcoming', async (req, res) => {
    try {
        const now = new Date();
        const upcomingCases = await Case.find({ start_date: { $gt: now } });
        res.json(upcomingCases);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/resolved', async (req, res) => {
    try {
        const now = new Date();
        const resolvedCases = await Case.find({ end_date: { $lt: now } });
        res.json(resolvedCases);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/pending', async (req, res) => {
    try {
        const now = new Date();
        const pendingCases = await Case.find({
            start_date: { $lte: now },
            end_date: { $gte: now },
        });
        res.json(pendingCases);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
