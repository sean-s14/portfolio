import { getSignedUrl as oldGetSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3client";

const expiresIn = 300; // 5 minutes

export async function getSignedUrl(url: string) {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET,
    Key: url || "",
    Expires: expiresIn, // 5 minutes
  };

  const command = new GetObjectCommand(params);
  const newUrl = await oldGetSignedUrl(s3Client, command, {
    expiresIn: expiresIn,
  });

  return newUrl;
}
