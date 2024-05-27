import { s3Client } from "@/lib/s3client";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";

export async function uploadImages(images: File[], folder: string) {
  try {
    for (let image of images) {
      const buffer = Buffer.from(await image.arrayBuffer());
      const image_path = `${folder}/${image.name}`;

      const input = {
        Body: buffer,
        Bucket: process.env.AWS_S3_BUCKET,
        Key: image_path,
      };
      const command = new PutObjectCommand(input);
      const response = await s3Client.send(command);
    }
  } catch (err) {
    throw err;
  }
}

export async function deleteImages(imagesToDelete: string[]) {
  try {
    for (let image of imagesToDelete) {
      const input = {
        Bucket: process.env.AWS_S3_BUCKET,
        Key: image,
      };
      const command = new DeleteObjectCommand(input);
      const response = await s3Client.send(command);
    }
  } catch (e) {
    throw e;
  }
}
