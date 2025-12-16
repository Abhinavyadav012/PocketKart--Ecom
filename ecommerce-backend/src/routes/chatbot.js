const express = require('express');
const { body } = require('express-validator');
const multer = require('multer');
const chatbotController = require('../controllers/chatbotController');

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 15 * 1024 * 1024 // 15 MB max
  }
});

router.post(
  '/chat',
  [
    body('message').isString().trim().notEmpty(),
    body('sessionId').optional().isString(),
    body('user').optional().isObject(),
    body('clientId').optional().isString(),
    body('enableWebSearch').optional().isBoolean(),
    body('enableRag').optional().isBoolean(),
    body('enableMemory').optional().isBoolean()
  ],
  chatbotController.handleChat
);

router.post(
  '/chat/stream',
  [
    body('message').isString().trim().notEmpty(),
    body('sessionId').optional().isString(),
    body('user').optional().isObject(),
    body('clientId').optional().isString(),
    body('enableWebSearch').optional().isBoolean(),
    body('enableRag').optional().isBoolean(),
    body('enableMemory').optional().isBoolean()
  ],
  chatbotController.handleChatStream
);

router.post(
  '/upload',
  upload.single('file'),
  chatbotController.handleUpload
);

router.post(
  '/rag-query',
  [
    body('query').isString().trim().notEmpty(),
    body('topK').optional().isInt({ min: 1, max: 10 })
  ],
  chatbotController.handleRagQuery
);

router.post(
  '/escalate',
  [
    body('sessionId').isString().trim().notEmpty(),
    body('reason').optional().isString(),
    body('metadata').optional().isObject()
  ],
  chatbotController.handleEscalate
);

router.get('/conversations', chatbotController.listConversations);
router.get('/conversations/:sessionId', chatbotController.getConversationBySession);
router.delete('/memory/:userId', chatbotController.deleteUserMemory);
router.get('/features', chatbotController.getFeatures);
router.patch('/features', chatbotController.toggleFeatures);
router.get('/escalations', chatbotController.listEscalations);

module.exports = router;
