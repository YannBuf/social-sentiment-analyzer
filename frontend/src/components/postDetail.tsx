import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Avatar,
  Paper,
  Divider,
  TextField,
  Button,
  Stack,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  IconButton,
  Breadcrumbs,
  Link,
} from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ReplyIcon from "@mui/icons-material/Reply";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useAuth } from "../context/AuthContext";

dayjs.extend(relativeTime);

type Reply = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
};

type Comment = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
};

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [post, setPost] = useState<{
    id: number;
    author: string;
    content: string;
    timestamp: string;
    category: string;
  } | null>(null);

  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [replyInput, setReplyInput] = useState<Record<number, string>>({});
  const [showReplyBox, setShowReplyBox] = useState<Record<number, boolean>>({});

  // ⛳ 本地模拟加载帖子详情
  useEffect(() => {
    if (!id) return;
    setPost({
      id: Number(id),
      author: "Alice",
      content: "This is a sample post content for post #" + id,
      timestamp: new Date().toISOString(),
      category: "General",
    });
  }, [id]);

  // ⛳ 本地模拟加载评论
  useEffect(() => {
    if (!id) return;
    const mockComments: Comment[] = [
      {
        id: 1,
        author: "Bob",
        content: "Nice post!",
        timestamp: dayjs().subtract(1, "hour").toISOString(),
        likes: 2,
        replies: [
          {
            id: 11,
            author: "Alice",
            content: "Thanks!",
            timestamp: dayjs().subtract(30, "minute").toISOString(),
          },
        ],
      },
      {
        id: 2,
        author: "Charlie",
        content: "I agree with this.",
        timestamp: dayjs().subtract(2, "hour").toISOString(),
        likes: 1,
        replies: [],
      },
    ];
    setComments(mockComments);
  }, [id]);

  // 提交新评论（本地模拟）
  const handleSubmitComment = () => {
    if (!newComment.trim() || !user) return;

    const newC: Comment = {
      id: comments.length + 1,
      author: user,
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([newC, ...comments]);
    setNewComment("");
  };

  // 点赞评论（本地模拟）
  const handleLike = (commentId: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === commentId ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  // 回复提交（本地模拟）
  const handleReplySubmit = (commentId: number) => {
    const text = replyInput[commentId]?.trim();
    if (!text || !user) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === commentId) {
          const newReply: Reply = {
            id: c.replies.length + 1000, // 随便给个不重复的 id
            author: user,
            content: text,
            timestamp: new Date().toISOString(),
          };
          return { ...c, replies: [...c.replies, newReply] };
        }
        return c;
      })
    );

    setReplyInput((prev) => ({ ...prev, [commentId]: "" }));
    setShowReplyBox((prev) => ({ ...prev, [commentId]: false }));
  };

  return (
    <Box p={4}>
      {/* 顶部返回与路径 */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>

        <Breadcrumbs separator="›" aria-label="breadcrumb">
          <Link underline="hover" color="inherit" onClick={() => navigate("/home")}>
            Home
          </Link>
          <Link underline="hover" color="inherit" onClick={() => navigate("/forum")}>
            Forum
          </Link>
          <Typography color="text.primary">Post #{id}</Typography>
        </Breadcrumbs>
      </Stack>

      {/* 帖子内容 */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        <Stack direction="row" spacing={2} alignItems="center" mb={2}>
          <Avatar>{post?.author[0]}</Avatar>
          <Typography variant="subtitle1">Author: {post?.author}</Typography>
        </Stack>
        <Typography variant="h6">Post #{post?.id}</Typography>
        <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-wrap" }}>
          {post?.content}
        </Typography>
      </Paper>

      {/* 评论列表 */}
      <Typography variant="h6" gutterBottom>
        Comments
      </Typography>

      <List sx={{ mb: 4 }}>
        {comments.map((comment) => (
          <Box key={comment.id} mb={3}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemAvatar>
                <Avatar>{comment.author[0]}</Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography fontWeight="bold">{comment.author}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dayjs(comment.timestamp).fromNow()}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.primary" sx={{ whiteSpace: "pre-wrap" }}>
                      {comment.content}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                      <IconButton
                        size="small"
                        onClick={() => handleLike(comment.id)}
                      >
                        <ThumbUpAltIcon fontSize="small" />
                      </IconButton>
                      <Typography variant="caption">{comment.likes}</Typography>
                      <Button
                        size="small"
                        startIcon={<ReplyIcon />}
                        onClick={() =>
                          setShowReplyBox((prev) => ({
                            ...prev,
                            [comment.id]: !prev[comment.id],
                          }))
                        }
                      >
                        Reply
                      </Button>
                    </Stack>

                    {/* 回复框 */}
                    {showReplyBox[comment.id] && (
                      <Box mt={2}>
                        <TextField
                          fullWidth
                          multiline
                          rows={2}
                          placeholder="Write a reply..."
                          value={replyInput[comment.id] || ""}
                          onChange={(e) =>
                            setReplyInput((prev) => ({
                              ...prev,
                              [comment.id]: e.target.value,
                            }))
                          }
                        />
                        <Button
                          onClick={() => handleReplySubmit(comment.id)}
                          sx={{ mt: 1 }}
                          variant="outlined"
                          size="small"
                        >
                          Submit Reply
                        </Button>
                      </Box>
                    )}

                    {/* 回复列表 */}
                    {comment.replies.length > 0 && (
                      <Box mt={2} ml={4}>
                        {comment.replies.map((r) => (
                          <Paper key={r.id} sx={{ p: 1, mb: 1 }} variant="outlined">
                            <Typography variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
                              <strong>{r.author}:</strong> {r.content}
                            </Typography>
                          </Paper>
                        ))}
                      </Box>
                    )}
                  </>
                }
              />
            </ListItem>
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </List>

      {/* 添加评论 */}
      {user && (
        <Stack spacing={2}>
          <TextField
            multiline
            rows={3}
            label="Leave a comment..."
            fullWidth
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button
            variant="contained"
            sx={{ width: "150px" }}
            onClick={handleSubmitComment}
          >
            Submit
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default PostDetail;
