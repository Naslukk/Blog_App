import "dotenv/config";
import { prisma } from "../src/lib/prisma";


async function main() {
  // Create User
  const user = await prisma.user.create({
    data: {
      name: "Naslu",
      email: "naslu@example.com",
      password: "password123",
    },
  });

  // Create Post
  const post = await prisma.post.create({
    data: {
      title: "My First Blog",
      content:
        "This is my first blog created using Next.js, Prisma, and PostgreSQL.",
      image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&auto=format&fit=crop",
      authorId: user.id,
    },
  });

  // Create Comment
  await prisma.comment.create({
    data: {
      content: "Great first post!",
      userId: user.id,
      postId: post.id,
    },
  });

  // Create Like
  await prisma.like.create({
    data: {
      userId: user.id,
      postId: post.id,
    },
  });

  console.log("✅ Sample data seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });