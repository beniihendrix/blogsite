import Link from "next/link";
import { useState } from "react";
import { Container, Stack, Button, Row, Col } from "react-bootstrap";
import { Post } from "@/types/Post";
import PostCard from "./PostCard";

// --- src/components/PostList.tsx ---
const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  return (
    <Container>
      <Stack direction="horizontal" gap={3}>
        <h1>Latest posts</h1>
        <Link href={`/posts/new`} legacyBehavior>
          <Button>+ new post</Button>
        </Link>
      </Stack>
      <Row xs={1} md={2}>
        {posts.map((post) => (
          <Col key={post.id}>
            <PostCard post={post} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default PostList;
