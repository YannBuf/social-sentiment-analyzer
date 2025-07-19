import React, { useState } from "react";
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

dayjs.extend(relativeTime);

type Comment = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: string[];
};

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Bob",
      content: "Great post!",
      timestamp: dayjs().subtract(10, "minute").toISOString(),
      likes: 2,
      replies: [],
    },
    {
      id: 2,
      author: "Jane",
      content: "Thanks for sharing.",
      timestamp: dayjs().subtract(5, "minute").toISOString(),
      likes: 1,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState("");
  const [replyInput, setReplyInput] = useState<Record<number, string>>({});
  const [showReplyBox, setShowReplyBox] = useState<Record<number, boolean>>({});

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "CurrentUser",
      content: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: [],
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  const handleLike = (id: number) => {
    setComments((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, likes: c.likes + 1 } : c
      )
    );
  };

  const handleReplySubmit = (id: number) => {
    const text = replyInput[id]?.trim();
    if (!text) return;

    setComments((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, replies: [...c.replies, text] }
          : c
      )
    );
    setReplyInput({ ...replyInput, [id]: "" });
    setShowReplyBox({ ...showReplyBox, [id]: false });
  };

  const handleBack = () => {
    navigate(-1); // 返回上一页
  };

  return (
    <Box p={4}>
      {/* 顶部返回与路径 */}
      <Stack direction="row" alignItems="center" spacing={2} mb={3}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
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
          <Avatar>A</Avatar>
          <Typography variant="subtitle1">Author: Alice</Typography>
        </Stack>
        <Typography variant="h6">Sample Post Title #{id}</Typography>
        <Typography variant="body1" color="text.secondary">
          This is a detailed post content. It will be fetched from backend in real implementation.
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
                  <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <Typography fontWeight="bold">{comment.author}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {dayjs(comment.timestamp).fromNow()}
                    </Typography>
                  </Stack>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.primary">
                      {comment.content}
                    </Typography>
                    <Stack direction="row" spacing={1} mt={1} alignItems="center">
                      <IconButton size="small" onClick={() => handleLike(comment.id)}>
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
                        {comment.replies.map((r, idx) => (
                          <Paper key={idx} sx={{ p: 1, mb: 1 }} variant="outlined">
                            <Typography variant="body2">
                              <strong>You:</strong> {r}
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
      <Stack spacing={2}>
        <TextField
          multiline
          rows={3}
          label="Leave a comment..."
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button variant="contained" sx={{ width: "150px" }} onClick={handleSubmitComment}>
          Submit
        </Button>
      </Stack>
    </Box>
  );
};

export default PostDetail;
