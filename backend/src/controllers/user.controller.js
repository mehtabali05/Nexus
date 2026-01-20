import User from "../models/User.model.js";

// GET logged-in user's profile
// export const getMyProfile = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.user._id);
//     res.json(user);
//   } catch (error) {
//     next(error);
//   }
// };

export const getMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).lean();

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const baseProfile = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatarUrl: user.avatarUrl,
      bio: user.profile?.bio || '',
      createdAt: user.createdAt
    };

    if (user.role === 'entrepreneur') {
      return res.json({
        ...baseProfile,
        ...user.entrepreneurProfile
      });
    }

    if (user.role === 'investor') {
      return res.json({
        ...baseProfile,
        ...user.investorProfile
      });
    }

  } catch (error) {
    next(error);
  }
};


// UPDATE logged-in user's profile
// export const updateMyProfile = async (req, res, next) => {
//   try {
//     const { bio, history, preferences } = req.body;

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.profile.bio = bio || user.profile.bio;
//     user.profile.history = history || user.profile.history;
//     user.profile.preferences = preferences || user.profile.preferences;

//     await user.save();

//     res.json({
//       message: "Profile updated successfully",
//       profile: user.profile
//     });
//   } catch (error) {
//     next(error);
//   }
// };

export const updateMyProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Common fields
    if (req.body.bio !== undefined) {
      user.profile.bio = req.body.bio;
    }

    // Entrepreneur-specific
    if (user.role === 'entrepreneur') {
      Object.assign(user.entrepreneurProfile, {
        startupName: req.body.startupName,
        pitchSummary: req.body.pitchSummary,
        fundingNeeded: req.body.fundingNeeded,
        industry: req.body.industry,
        location: req.body.location,
        foundedYear: req.body.foundedYear,
        teamSize: req.body.teamSize
      });
    }

    // Investor-specific
    if (user.role === 'investor') {
      Object.assign(user.investorProfile, {
        investmentInterests: req.body.investmentInterests,
        investmentStage: req.body.investmentStage,
        portfolioCompanies: req.body.portfolioCompanies,
        totalInvestments: req.body.totalInvestments,
        minimumInvestment: req.body.minimumInvestment,
        maximumInvestment: req.body.maximumInvestment
      });
    }

    await user.save();

    const updatedUser = await User.findById(req.user._id).lean();

    res.json({
      id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role,
      avatarUrl: updatedUser.avatarUrl,
      bio: updatedUser.profile?.bio || '',
      ...(
        updatedUser.role === 'entrepreneur'
          ? updatedUser.entrepreneurProfile
          : updatedUser.investorProfile
      )
    });
  } catch (error) {
    next(error);
  }
};


