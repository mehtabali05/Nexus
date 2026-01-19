import User from "../models/User.model.js";

// GET logged-in user's profile
export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

// UPDATE logged-in user's profile
export const updateMyProfile = async (req, res, next) => {
  try {
    const { bio, history, preferences } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.profile.bio = bio || user.profile.bio;
    user.profile.history = history || user.profile.history;
    user.profile.preferences = preferences || user.profile.preferences;

    await user.save();

    res.json({
      message: "Profile updated successfully",
      profile: user.profile
    });
  } catch (error) {
    next(error);
  }
};
