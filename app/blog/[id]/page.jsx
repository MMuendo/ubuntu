import { redirect } from "next/navigation";

export default async function OldBlogPostPage({ params }) {
  const { id } = await params;
  redirect(`/blogs/${id}`);
}
