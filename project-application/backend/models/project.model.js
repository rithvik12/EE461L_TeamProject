//database schema for project model

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//project model fields and validation
const projectSchema = new Schema({
  username: { type: String, required: true },
  description: { type: String, required: true },
  projectID: { type: Number, required: true },
  date: { type: Date, required: true },
}, {
  timestamps: true,
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;