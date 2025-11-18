import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

// 1. Configure the S3 Client for Backblaze B2 using environment variables
export const s3 = new S3Client({
  endpoint: process.env.B2_ENDPOINT_URL, 
  region: process.env.B2_REGION,
  credentials: {
    // B2 uses "Application Key ID" and "Application Key"
    accessKeyId: process.env.B2_APPLICATION_KEY_ID!,
    secretAccessKey: process.env.B2_APPLICATION_KEY!,
  },
});

/**
 * Generates a pre-signed URL for accessing an object in a private B2 bucket.
 * @param key The object key (path/filename) saved in the database.
 * @param bucketName The name of the B2 bucket.
 * @returns A promise that resolves to the temporary, secure public URL string.
 */
export async function generateSignedUrl(key: string, bucketName: string): Promise<string> {
  // Create a command to get the object
  const getObjectCommand = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  // Generate the pre-signed URL (valid for 60 minutes/3600 seconds)
  const signedUrl = await getSignedUrl(s3, getObjectCommand, { expiresIn: 3600 }); 
  
  return signedUrl;
}