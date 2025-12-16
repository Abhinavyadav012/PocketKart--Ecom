const { validationResult } = require('express-validator');
const chatbotService = require('../services/chatbotService');
const memoryService = require('../services/memoryService');
const featureSwitchService = require('../services/featureSwitchService');

const sendValidationErrors = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  return null;
};

exports.handleChat = async (req, res, next) => {
  try {
    const errorResponse = sendValidationErrors(req, res);
    if (errorResponse) return errorResponse;

    const payload = req.body;
    const response = await chatbotService.handleChatMessage({
      ...payload,
      streaming: false
    });

    res.json(response);
  } catch (error) {
    next(error);
  }
};

exports.handleChatStream = async (req, res, next) => {
  try {
    const errorResponse = sendValidationErrors(req, res);
    if (errorResponse) return errorResponse;

    const payload = req.body;
    const streamRegistration = await chatbotService.handleChatMessage({
      ...payload,
      streaming: true
    });

    res.json(streamRegistration);
  } catch (error) {
    next(error);
  }
};

exports.handleUpload = async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { sessionId, userId } = req.body;
    const result = await chatbotService.processUpload({
      fileBuffer: req.file.buffer,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
      sessionId,
      userId
    });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

exports.handleRagQuery = async (req, res, next) => {
  try {
    const errorResponse = sendValidationErrors(req, res);
    if (errorResponse) return errorResponse;

    const { query, topK } = req.body;
    const result = await chatbotService.searchKnowledgeBase({ query, topK });

    res.json(result);
  } catch (error) {
    next(error);
  }
};

exports.handleEscalate = async (req, res, next) => {
  try {
    const errorResponse = sendValidationErrors(req, res);
    if (errorResponse) return errorResponse;

    const result = await chatbotService.createEscalation(req.body);
    res.status(202).json(result);
  } catch (error) {
    next(error);
  }
};

exports.listConversations = async (req, res, next) => {
  try {
    const conversations = await chatbotService.listConversations();
    res.json(conversations);
  } catch (error) {
    next(error);
  }
};

exports.getConversationBySession = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    const convo = await chatbotService.getConversation(sessionId);
    if (!convo) {
      return res.status(404).json({ message: 'Conversation not found' });
    }
    res.json(convo);
  } catch (error) {
    next(error);
  }
};

exports.deleteUserMemory = async (req, res, next) => {
  try {
    const { userId } = req.params;
    await memoryService.deleteUserMemory(userId);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

exports.toggleFeatures = async (req, res, next) => {
  try {
    const updated = await featureSwitchService.updateFeatureFlags(req.body || {});
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.getFeatures = async (req, res, next) => {
  try {
    const flags = featureSwitchService.getFeatureFlags();
    res.json(flags);
  } catch (error) {
    next(error);
  }
};

exports.listEscalations = async (req, res, next) => {
  try {
    const escalations = await chatbotService.listEscalations();
    res.json(escalations);
  } catch (error) {
    next(error);
  }
};
