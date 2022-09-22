const COMPANY = {
  INSTAGRAM: "instagram",
  YOUTUBE: "youtube",
  FACEBOOK: "facebook",
};

const CATEGORY = {
  LANDSCAPE: "landscape",
  SQUARE: "square",
  THUMBNAIL: "thumbnail",
  COVER: "cover",
};

const DIMENSION = {
  [COMPANY.INSTAGRAM]: {
    [CATEGORY.LANDSCAPE]: [1080, 566],
    [CATEGORY.SQUARE]: [1080, 1080],
  },
  [COMPANY.YOUTUBE]: {
    [CATEGORY.THUMBNAIL]: [1280, 720],
  },
  [COMPANY.FACEBOOK]: {
    [CATEGORY.COVER]: [851, 315],
  },
};

module.exports = {
  DIMENSION,
};
