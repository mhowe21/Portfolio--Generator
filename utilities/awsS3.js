const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });
const fs = require("fs");
const { resolve } = require("path");
require("dotenv").config();
//let file = "testFile.jpg";

class s3Handle {
  constructor(bucketName) {
    this.ID = process.env.AWS_ID;
    this.SECRET = process.env.AWS_SEC;

    this.BUCKET_NAME = bucketName;

    this.s3 = new AWS.S3({
      accessKeyId: this.ID,
      secretAccessKey: this.SECRET,
    });
  }

  async createBucket() {
    return new Promise(function (resolve, reject) {
      const params = {
        Bucket: this.BUCKET_NAME,
      };
      this.s3.createBucket(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }
  async uploadFile() {
    return new Promise(function (resolve, reject) {
      const fileItem = fs.readFileSync(file);

      let params = {
        Bucket: this.BUCKET_NAME,
        Key: file,
        Body: fileItem,
      };

      this.s3.upload(params, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    });
  }
  async getFile() {
    return new Promise(function (resolve, reject) {
      let params = {
        Bucket: this.BUCKET_NAME,
        Key: file,
      };
      this.s3.getObject(params, function (err, data) {
        if (err) {
          reject(err);
        } else {
          resolve(data.Body);
        }
      });
    });
  }
}

module.exports = s3Handle;

// async function createBucket() {
//   return new Promise(function (resolve, reject) {
//     const params = {
//       Bucket: this.BUCKET_NAME,
//     };
//     this.s3.createBucket(params, function (err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.Location);
//       }
//     });
//   });
// }

// upload a file.
// function uploadFile() {
//   return new Promise(function (resolve, reject) {
//     const fileItem = fs.readFileSync(file);

//     let params = {
//       Bucket: BUCKET_NAME,
//       Key: file,
//       Body: fileItem,
//     };

//     this.s3.upload(params, (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.Location);
//       }
//     });
//   });
// }

// get files
// function getFile() {
//   return new Promise(function (resolve, reject) {
//     let params = {
//       Bucket: BUCKET_NAME,
//       Key: file,
//     };
//     this.s3.getObject(params, function (err, data) {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data.Body);
//       }
//     });
//   });
// }

// async function bucketItems() {
//   let createdBucket = await createBucket();
//   console.log(createdBucket);
//   let createdFile = await uploadFile();
//   console.log(createdFile);
//   let item = await getFile();
//   console.log(item);
// }
