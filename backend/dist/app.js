"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cartRoutes_1 = __importDefault(require("./routes/cartRoutes"));
const wishlistRoutes_1 = __importDefault(require("./routes/wishlistRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("./models/User");
require("./models/Product");
require("./models/Wishlist");
dotenv_1.default.config();
const app = (0, express_1.default)();
// 1. Логирование запросов (первым)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    // Безопасная проверка req.body
    if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
        console.log('Request body:', req.body);
    }
    next();
});
// 2. CORS (вторым)
app.use((0, cors_1.default)({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));
// 3. Cookie Parser
app.use((0, cookie_parser_1.default)());
// 4. Парсинг JSON
app.use(express_1.default.json());
// 5. Роуты
app.use('/auth', authRoutes_1.default);
app.use('/api/cart', cartRoutes_1.default);
app.use('/api/wishlist', wishlistRoutes_1.default);
// MongoDB подключение
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB connected'))
    .catch(err => console.log('❌ MongoDB error:', err));
// Middleware для обработки ошибок (последним)
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ message: 'Internal server error' });
});
exports.default = app;
