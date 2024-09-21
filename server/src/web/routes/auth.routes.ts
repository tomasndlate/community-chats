// const express = require('express');
import express from "express";
import { signin, signup } from '../controllers/auth.controller';

export const authRouter = express.Router();
// import
// const googleMiddleware = require('../middleware/googleMidleware');
// const passport = require('../../configs/passportConfig');

authRouter.post('/signup', signup);

// router.post('/signup', )

authRouter.post('/signin', signin);

// router.get('/google', passport.authenticate('google', { scope: ['email', 'profile'] }));
// router.get('/google/callback', googleMiddleware, authController.login);

// export router;
