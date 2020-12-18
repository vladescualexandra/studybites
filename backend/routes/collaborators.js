const express = require('express');
const router = express.Router();

const collaborators = require('../controllers/CollaboratorsController.js');

router.get('/collaborators', collaborators.findAllCollaborators)
router.get('shared/:id/collaborators', collaborators.findCollaborators);
router.post('/collaborators', collaborators.createCollaborator);
router.put('/collaborators/:id', collaborators.updateCollaborator);
router.delete('/shared/:sid/collaborators/:cid', collaborators.deleteCollaborator);

module.exports = router