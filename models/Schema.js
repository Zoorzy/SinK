const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  url: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  Node: {
    type: {
      type: String,
      required: true
    },
    loc: {
      start: {
        line: {
          type: Number,
          required: true
        },
        column: {
          type: Number,
          required: true
        },
        index: {
          type: Number,
          required: true
        }

      },
      end: {
        line: {
          type: Number,
          required: true
        },
        column: {
          type: Number,
          required: true
        },
        index: {
          type: Number,
          required: true
        }

      }
    },
    name: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Schema', Schema);