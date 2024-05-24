import { getSignedUrl } from "@/helpers/getSignedUrl";
import { s3Client } from "@/lib/s3client";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = (formData.get("file") as File) || null;
  if (!file) {
    return Response.json({ error: "File or Filepath missing" });
  }
  const buffer = Buffer.from(await file.arrayBuffer());

  const input = {
    Body: buffer,
    Bucket: process.env.AWS_S3_BUCKET,
    Key: file.name,
  };
  const command = new PutObjectCommand(input);

  try {
    const response = await s3Client.send(command);
    const signedUrl = await getSignedUrl(file.name);
    return Response.json({ signedUrl });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "Error uploading image" });
  }
}
