import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true
//     },

//     password: {
//       type: String,
//       required: true,
//       select: false // IMPORTANT: password never returned by default
//     },

//     role: {
//       type: String,
//       enum: ["investor", "entrepreneur"],
//       required: true
//     },

//     profile: {
//       bio: String,
//       history: String,
//       preferences: String
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("User", userSchema);


const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true, select: false }, // never returned by default
  role: {
    type: String,
    enum: ["entrepreneur", "investor"],
    required: true
  },
  avatarUrl: String,
  profile: {
    bio: String,
    history: String,
    preferences: Object
  },
  entrepreneurProfile: {
    startupName: String,
    pitchSummary: String,
    fundingNeeded: String,
    industry: String,
    location: String,
    foundedYear: Number,
    teamSize: Number
  },
  investorProfile: {
    investmentInterests: [String],
    investmentStage: [String],
    portfolioCompanies: [String],
    totalInvestments: Number,
    minimumInvestment: String,
    maximumInvestment: String
  }
}, { timestamps: true });

export default mongoose.model("User", UserSchema);

