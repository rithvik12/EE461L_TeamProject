const router = require('express').Router();
let Project = require('../models/project.model');


router.route('/').get((req, res) => {
  Project.find()
    .then(projects => res.json(projects))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const projectID = Number(req.body.projectID);
  const date = Date.parse(req.body.date);

  const newProject = new Project({
    username,
    description,
    projectID,
    date,
  });

  newProject.save()
  .then(() => res.json('Project added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

// returns project item given an 'id'
router.route('/:id').get((req, res) => {
    Project.findById(req.params.id)
      .then(project => res.json(project))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// deletes project item given an 'id'
  router.route('/:id').delete((req, res) => {
    Project.findByIdAndDelete(req.params.id)
      .then(() => res.json('Project deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

// updates existing project item
// first retrieve old project item from database based on 'id'
// then set project property values to what is available in request body
// project.save saves updated object into the database
  router.route('/update/:id').post((req, res) => {
    Project.findById(req.params.id)
      .then(project => {
        project.username = req.body.username;
        project.description = req.body.description;
        project.projectID = Number(req.body.projectID);
        project.date = Date.parse(req.body.date);
  
        project.save()
          .then(() => res.json('Project updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

module.exports = router;