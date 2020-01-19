import fs from 'fs';
import ErrorResponse from '../utils/errorResponse';
import asyncHandler from '../middleware/async';
import Profile from '../models/profile';

const getProfile = asyncHandler(async (req, res, next) => {
  /* Logged in user Id Required */
  const id = req && req.id ? req.id : null;
  if (!id) return next(new ErrorResponse('User id not found', 401));

  const profile = await Profile.findOne({ id });
  if (!profile)
    return next(new ErrorResponse('No Profile Found with that user id', 404));

  return res.json({ success: true, data: profile });
});

const getSimilarIndustries = asyncHandler(async (req, res, next) => {
  /* Logged in user Id Required */
  const id = req && req.id ? req.id : null;
  if (!id) return next(new ErrorResponse('User id not found', 401));

  /* Param is required */
  /* Param should be the industry title */
  const { industryTitle } = req.params;

  /* Reading Data from JSON file */
  /* JSON is generated from Excel file */
  const data = fs.readFileSync('data.json', 'utf8');

  /* Converting JSON into Object */
  const jsonObj = JSON.parse(data);

  /* Getting Industry Titles from JSON object */
  const industryTitles = jsonObj.data[0];

  /* Finding the requested Industry Title Index */
  const titleIndex = industryTitles.indexOf(industryTitle);
  if (titleIndex === -1) {
    return next(
      new ErrorResponse(
        'The requested industry is not found in the Excel data sheet',
        404
      )
    );
  }
  /* Data for the requested Industry */
  const foundIndustry = jsonObj.data[titleIndex];

  const similarIndustries = [];

  /* Looping through the found Industry and find Similar Industries based on score */
  for (let i = 1; i <= foundIndustry.length; i += 1) {
    if (foundIndustry[i] > 0) {
      similarIndustries.push({
        title: industryTitles[i],
        score: foundIndustry[i]
      });
    }
  }

  /* Sorting the similar industries by score in descending order and return only top 5 */
  similarIndustries.sort((a, b) => parseFloat(b.score) - parseFloat(a.score));
  const top = similarIndustries.slice(1, 6);

  /* Saving data in User Profile */
  const search = {
    parentIndustry: industryTitle,
    similarIndustries: top
  };
  await Profile.updateOne(
    { id, 'searches.parentIndustry': { $ne: search.parentIndustry } },
    { $push: { searches: search } }
  );

  /* Returning JSON back */
  // const updatedProfile = await Profile.findOne({ id });
  return res.json({ success: 1, data: top });
});

const setPreferences = async (req, res, next) => {
  /* Logged in user Id Required */
  const id = req && req.id ? req.id : null;
  if (!id) return next(new ErrorResponse('User id not found', 401));
  console.log(req.body);
  // const { searchId } = req.parmas;
  const values = Object.values(req.body);
  console.log(values[0]);
  const profile = await Profile.findOne({ id });
  const doc = profile.searches.id(values[0]);
  doc.similarIndustries[0].preference = !doc.similarIndustries[0].preference;

  await profile.save();

  return res.json({
    success: 1,
    message: 'Successfully Updated the prefernces'
  });
};

export { getProfile, getSimilarIndustries, setPreferences };
