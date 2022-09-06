const mongoose = require('mongoose');

const Identifier = mongoose.Schema({
  Node: {
    type: {
      type: String,
      required: true
    },
    start: {
      type: Number,
      required: true
    },
    end: {
      type: Number,
      required: true
    },
    loc: {
      start: {
        Position: {
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
      end: {
        Position: {
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
      filename: {
        type: String,
        required: true
      },
      identifierName: {
        type: String,
        required: true
      }
    },
    name: {
      type: String,
      required: true
    }
  }
});

module.exports = mongoose.model('Identifier', Identifier);