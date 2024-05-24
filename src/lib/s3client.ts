import { S3Client } from "@aws-sdk/client-s3";

if (!process.env.AWS_S3_REGION) {
  throw new Error("Missing AWS_S3_REGION env var");
}

if (!process.env.AWS_ACCESS_KEY_ID) {
  throw new Error("Missing AWS_ACCESS_KEY_ID env var");
}

if (!process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error("Missing AWS_SECRET_ACCESS_KEY env var");
}

export const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});
