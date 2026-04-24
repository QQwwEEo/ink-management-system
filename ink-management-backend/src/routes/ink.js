const express = require('express');
const inkController = require('../controllers/inkController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// 获取所有油墨
router.get('/list', inkController.getInks);

// 根据 ID 获取油墨详情
router.get('/:id', inkController.getInkById);

// 创建油墨（需要认证）
router.post('/', authMiddleware, inkController.createInk);

// 更新油墨（需要认证）
router.put('/:id', authMiddleware, inkController.updateInk);

// 删除油墨（需要认证）
router.delete('/:id', authMiddleware, inkController.deleteInk);

module.exports = router;
