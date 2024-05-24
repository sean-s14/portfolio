"use server";

import prisma from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import slugify from "slugify";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getSignedUrl } from "@/helpers/getSignedUrl";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "@/lib/s3client";
import { diffArrays } from "@/helpers/diffArrays";

export async function createProject(prevState: any, formData: FormData) {
  const schema = z.object({
    title: z
      .string()
      .min(3, {
        message: "Title must be at least 6 characters long",
      })
      .max(50),
    url: z.string().url(),
    description: z.string(),
    imageLinks: z.string(),
    tags: z.string(),
  });

  const parse = schema.safeParse({
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description"),
    imageLinks: formData.get("imageLinks") || "",
    tags: formData.get("tags"),
  });

  if (!parse.success) {
    console.error(parse.error);
    const formatted = parse.error.format();
    /* {
      title: { _errors: [ 'Expected string, received number' ] }
    } */
    return formatted;
  }

  const data = parse.data;

  try {
    await prisma.project.create({
      data: {
        title: data.title,
        slug: slugify(data.title, { lower: true }),
        url: data.url,
        description: data.description,
        imageLinks: data.imageLinks.split(" "),
        tags: data.tags.split(" "),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { message: "Project already exists" };
      }
    }
    console.error(e);
    return { message: "Failed to add project" };
  }

  revalidatePath("/projects/create");
  redirect("/projects");
}

export async function updateProject(prevState: any, formData: FormData) {
  const schema = z.object({
    id: z.string(),
    title: z
      .string()
      .min(3, {
        message: "Title must be at least 6 characters long",
      })
      .max(50),
    url: z.string().url(),
    description: z.string(),
    imageLinks: z.string(),
    tags: z.string(),
  });

  const parse = schema.safeParse({
    id: formData.get("id"),
    title: formData.get("title"),
    url: formData.get("url"),
    description: formData.get("description"),
    imageLinks: formData.get("imageLinks") || "",
    tags: formData.get("tags"),
  });

  if (!parse.success) {
    console.log(parse.error);
    const formatted = parse.error.format();
    /* {
      title: { _errors: [ 'Expected string, received number' ] }
    } */
    return formatted;
  }

  const data = parse.data;
  const slug = slugify(data.title, { lower: true });

  // Delete images from AWS S3 storage
  try {
    const project = await prisma.project.findUnique({
      where: { slug },
    });
    if (project?.imageLinks) {
      const imagesToDelete = diffArrays(
        project.imageLinks,
        data.imageLinks.split(" ")
      );
      for (let image of imagesToDelete) {
        const input = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: image,
        };
        const command = new DeleteObjectCommand(input);
        const response = await s3Client.send(command);
      }
    }
  } catch (e) {
    console.error(e);
    return { message: "Failed to delete images, refresh and try again" };
  }

  try {
    await prisma.project.update({
      where: { id: data.id },
      data: {
        title: data.title,
        slug: slug,
        url: data.url,
        description: data.description,
        imageLinks: data.imageLinks.split(" "),
        tags: data.tags.split(" "),
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return { message: "Project already exists" };
      }
    }
    console.log(e);
    return { message: "Failed to add project" };
  }

  revalidatePath("/projects");
  revalidatePath(`/projects/${slug}`);
  redirect(`/projects/${slug}`);
}

export async function deleteProject(formData: FormData) {
  const schema = z.object({
    id: z.string(),
  });

  const parse = schema.safeParse({
    id: formData.get("id"),
  });

  if (!parse.success) {
    console.log(parse.error);
    const formatted = parse.error.format();
    /* {
      title: { _errors: [ 'Expected string, received number' ] }
    } */
    return formatted;
  }

  const data = parse.data;

  // Delete images from AWS S3 storage
  try {
    const project = await prisma.project.findUnique({
      where: { id: data.id },
    });
    if (project?.imageLinks) {
      for (let image of project.imageLinks) {
        const input = {
          Bucket: process.env.AWS_S3_BUCKET,
          Key: image,
        };
        const command = new DeleteObjectCommand(input);
        const response = await s3Client.send(command);
      }
    }
  } catch (e) {
    console.error(e);
    return {
      message:
        "Failed to delete images for this project, refresh and try again",
    };
  }

  try {
    await prisma.project.delete({
      where: { id: data.id },
    });
  } catch (e) {
    console.error(e);
    return { message: "Failed to delete project" };
  }

  revalidatePath("/projects");
  redirect("/projects");
}

export async function getProjects() {
  const projects = await prisma.project.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  for (let project of projects) {
    if (project.imageLinks.length > 0 && project.imageLinks[0] !== "") {
      for (let i = 0; i < project.imageLinks.length; i++) {
        project.imageLinks[i] = await getSignedUrl(project.imageLinks[i]);
      }
    }
  }

  return projects;
}

export async function getProject(slug: string) {
  const project = await prisma.project.findUnique({
    where: {
      slug: slug,
    },
  });

  if (project !== null) {
    if (project.imageLinks.length > 0 && project.imageLinks[0] !== "") {
      for (let i = 0; i < project.imageLinks.length; i++) {
        project.imageLinks[i] = await getSignedUrl(project.imageLinks[i]);
      }
    }
  }

  return project;
}
