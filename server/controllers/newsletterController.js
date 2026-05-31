import SubscriberModel from "../models/subscriberModel.js";

const newsletterController = {
  async subscribe(req, res) {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email address is required",
        });
      }

      // Simple regex validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({
          success: false,
          message: "Please enter a valid email address",
        });
      }

      // Check if already subscribed
      const existing = await SubscriberModel.findByEmail(email.toLowerCase());
      if (existing) {
        return res.status(200).json({
          success: true,
          message: "You are already subscribed to our newsletter!",
        });
      }

      await SubscriberModel.create(email.toLowerCase());

      console.log(`📩 New subscriber added: ${email}`);

      res.status(201).json({
        success: true,
        message: "Thank you for subscribing to our newsletter!",
      });
    } catch (error) {
      console.error("❌ Newsletter subscribe error:", error);
      res.status(500).json({
        success: false,
        message: "Server error while subscribing to newsletter",
      });
    }
  }
};

export default newsletterController;
