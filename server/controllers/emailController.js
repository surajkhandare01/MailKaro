import Email from "../models/Email.js";
import aiService, { smartReplyService } from "../services/aiService.js";

// Guest usage tracker Map by Client IP: { "127.0.0.1": 2 }
const guestUsageTracker = new Map();

const isGuestLimitExceeded = (clientIdentifier) => {
  const currentCount = guestUsageTracker.get(clientIdentifier) || 0;
  if (currentCount >= 2) {
    return true; // Limit exceeded
  }
  guestUsageTracker.set(clientIdentifier, currentCount + 1);
  return false;
};

export const generateEmailController = async (req, res, next) => {
  try {
    const { topic, tone = "Professional", language = "English" } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ message: "Topic is required" });
    }

    const isAuthenticated = Boolean(req.user && req.user.id);
    const identifier = isAuthenticated
      ? req.user.id
      : req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local_guest";

    // Enforce 2 emails for guest users
    if (!isAuthenticated) {
      const limitExceeded = isGuestLimitExceeded(identifier);
      if (limitExceeded) {
        return res.status(403).json({
          success: false,
          limitReached: true,
          message: "तुमचे २ मोफत ईमेल्स संपले आहेत! कृपया पुढील वापरासाठी लॉगिन करा.",
        });
      }
    }

    const generatedEmail = await aiService(topic, tone, language);

    let savedEmail = null;
    if (isAuthenticated) {
      savedEmail = await Email.create({
        user: req.user.id,
        topic,
        tone,
        language,
        generatedEmail,
      });
    }

    res.status(200).json({
      success: true,
      email: {
        generatedEmail,
        _id: savedEmail?._id || null,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const generateSmartReplyController = async (req, res, next) => {
  try {
    const { incomingEmail, intent, tone = "Professional", language = "English" } = req.body;

    if (!incomingEmail || !incomingEmail.trim()) {
      return res.status(400).json({ message: "Incoming email content is required" });
    }

    const isAuthenticated = Boolean(req.user && req.user.id);
    const identifier = isAuthenticated
      ? req.user.id
      : req.headers["x-forwarded-for"] || req.socket.remoteAddress || "local_guest";

    if (!isAuthenticated) {
      const limitExceeded = isGuestLimitExceeded(identifier);
      if (limitExceeded) {
        return res.status(403).json({
          success: false,
          limitReached: true,
          message: "तुमचे २ मोफत स्मार्ट रिप्लाय संपले आहेत! कृपया पुढील वापरासाठी लॉगिन करा.",
        });
      }
    }

    const replies = await smartReplyService(incomingEmail, intent, tone, language);

    res.status(200).json({
      success: true,
      replies,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmailHistory = async (req, res, next) => {
  try {
    const emails = await Email.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: emails.length, emails });
  } catch (error) {
    next(error);
  }
};

export const deleteEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const email = await Email.findOneAndDelete({ _id: id, user: req.user.id });
    if (!email) return res.status(404).json({ message: "Email not found" });
    res.status(200).json({ success: true, message: "Email deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const updateEmail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { topic, generatedEmail, tone, language } = req.body;
    const email = await Email.findOneAndUpdate(
      { _id: id, user: req.user.id },
      {
        ...(topic && { topic }),
        ...(generatedEmail && { generatedEmail }),
        ...(tone && { tone }),
        ...(language && { language }),
      },
      { new: true, runValidators: true }
    );
    if (!email) return res.status(404).json({ message: "Email not found" });
    res.status(200).json({ success: true, message: "Email updated successfully", email });
  } catch (error) {
    next(error);
  }
};