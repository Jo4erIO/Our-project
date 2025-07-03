"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
const PORT = process.env.PORT || 5000;
const server = http_1.default.createServer(app_1.default);
server.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
// Обработка ошибки "адрес уже используется"
server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is already in use, trying port ${Number(PORT) + 1}...`);
        server.listen(Number(PORT) + 1);
    }
    else {
        console.error('Server startup error:', error);
        process.exit(1);
    }
});
server.on('listening', () => {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr?.port}`;
    console.log(`✅ Server listening on ${bind}`);
});
