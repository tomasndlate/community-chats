// const express = require('express');
import express from "express";
const router = express.Router();
import { signin, signup } from '../controllers/auth.controller';
// import
// const googleMiddleware = require('../middleware/googleMidleware');
// const passport = require('../../configs/passportConfig');

router.post('/signup', signup);

// router.post('/signup', )

router.post('/signin', signin);

// router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// router.get('/google/callback', googleMiddleware, authController.login);

module.exports = router;
