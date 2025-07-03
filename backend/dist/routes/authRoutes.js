"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/authController");
const router = (0, express_1.Router)();
// Тестовый роут для проверки работы API
router.get('/test', (req, res) => {
    res.json({ message: "API работает!" });
});
// Регистрация пользователя
router.post('/register', async (req, res, next) => {
    try {
        await (0, authController_1.register)(req, res);
    }
    catch (error) {
        next(error);
    }
});
// Авторизация пользователя
router.post('/login', async (req, res, next) => {
    try {
        await (0, authController_1.login)(req, res);
    }
    catch (error) {
        next(error);
    }
});
exports.default = router;
