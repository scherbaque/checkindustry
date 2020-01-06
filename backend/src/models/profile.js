import mongoose from 'mongoose';

const { Schema } = mongoose;

const profileSchema = new Schema({
  id: { type: String, required: true },
  user: {
    name: { type: String },
    email: { type: String }
  },
  searches: [
    {
      parentIndustry: { type: String },
      similarIndustries: [
        {
          title: { type: String },
          score: { type: String },
          preference: { type: Boolean, default: null }
        }
      ]
    }
  ]
});

const Profile = mongoose.model('profile', profileSchema);

export default Profile;
