const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const config = require('../config/database');


// User Schema
const ScoreSchema = mongoose.Schema({
    teamA: {
        type: String,
        required: true
    },
    teamB: {
        type: String,
        required: true
    },
    batting: {
        type: String,
        required: true
    },
    overs: {
        type: String,
        required: true
    },
    balls: {
        type: String,
        required: true
    },
    wickets: {
        type: String,
        required: true
    },
    runs: {
        type: String,
        required: true
    },
    created: { 
        type: Date,
        default: Date.now 
    }
});

const Score = module.exports = mongoose.model('Score', ScoreSchema);

module.exports.getScore = function(callback) {
    Score.find(callback);
}

module.exports.addScore = function(newScore, callback) {
    newScore.save(callback);
}