"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const port = 3000;
//Kino frontend
app.get('/', (req, res) => res.send('frontend will be here'));
app.get('/api/hello', (req, res) => res.send('Hello World!'));
app.listen(port, () => console.log(`Kino API running on ${port}.`));
//# sourceMappingURL=server.js.map