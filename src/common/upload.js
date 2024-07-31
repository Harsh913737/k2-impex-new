const multer = require("multer");
const multerS3 = require("multer-s3");
const aws = require("aws-sdk");

const spacesEndpoint = new aws.Endpoint("https://sgp1.digitaloceanspaces.com");
const s3 = new aws.S3({
  endpoint: spacesEndpoint,
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "zoommantra",
    acl: "public-read",
    key: function (request, file, cb) {
      console.log(file);
      cb(null, file.originalname);
    },
  }),
});

export default upload;
