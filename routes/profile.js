const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth')

router.get('/profile', auth.verifyToken, async (req, res) => {
    res.send( { status: 1, message: 'Successfully'} )
});

module.exports = router;