// models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
    def_name: String,
    start_date: Date,
    end_date: Date,
});

const Case = mongoose.model('Case', caseSchema);

module.exports = Case;
