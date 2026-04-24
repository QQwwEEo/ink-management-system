const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const app = express();

// 安全中间件
app.use(helmet());
app.use(cors());

// 解析请求体
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 健康检查路由
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// API 路由
app.use('/api/auth', require('./routes/auth'));
app.use('/api/ink', require('./routes/ink'));
app.use('/api/color', require('./routes/color'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/purchase', require('./routes/purchase'));

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: '服务器错误' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在 http://localhost:${PORT}`);
});

module.exports = app;
