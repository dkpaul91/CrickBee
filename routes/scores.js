const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Score = require('../models/score');
const config = require('../config/database');

const router = express.Router();

// Get all scores
router.get('/all', (req, res, next) => {
    Score.getScore(function(err, scores) {
        if(err) {
            res.json({success: false, msg: 'Error retrieving score update'});
        } else {
            res.json({scores: scores});
        }
    });    
});

// Add new score
router.post('/add', (req, res, next) => {
    let newScore = new Score({
        teamA: req.body.teamA,
        teamB: req.body.teamB,
        batting: req.body.batting,
        overs: req.body.overs,
        balls: req.body.balls,
        wickets: req.body.wickets,
        runs: req.body.runs
    });
    
    Score.addScore(newScore, (err, score) => {
        if(err) {
            //console.log(err);
            res.json({success: false, msg: 'Failed to add score'});
        } else {
            res.json({success: true, msg: 'Score updated'});
        }
    });
});

module.exports = router;