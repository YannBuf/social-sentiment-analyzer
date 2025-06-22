import React, { useEffect, useState, useMemo } from "react";
import {
  Box, Typography, Card, CardContent, Button, TextField,
  Avatar, Grid, Pagination, Stack, IconButton, Select,
  MenuItem, FormControl, InputLabel, Dialog, DialogTitle,
  DialogContent, DialogActions
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useAuth } from "../context/AuthContext";
import {fetchPosts, createPost} from "../api";


dayjs.extend(relativeTime);

const POSTS_PER_PAGE = 5;
const CATEGORIES = ["All", "General", "Tech", "News", "Sports"];

type Post = {
  id: number;
  author: string;
  content: string;
  category: string;
  timestamp: string;
};

const Forum = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [currentPage, setCurrentPage] = useState(1);

  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  const [filterCategory, setFilterCategory] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  // ⛳ 后端尝试
  useEffect(() => {
    const loadPosts = async () => {
      try {
        const data = await fetchPosts(filterCategory, searchKeyword);
        setPosts(data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };
    loadPosts();
  }, [filterCategory, searchKeyword]);

  const handlePostSubmit = async () => {
    if (!newPostContent.trim() || !user) return;

    try {
      const newPost = await createPost({
        user_id: user.id, // ✅ 从 user 取 id（你应该在 AuthContext 中提供完整 user 对象）
        content: newPostContent.trim(),
        category: newPostCategory,
      });
      setPosts((prev) => [newPost, ...prev]);
      setNewPostContent("");
      setNewPostCategory("General");
      setCurrentPage(1);
    } catch (err) {
      console.error("Failed to create post:", err);
    }
  };

  const startEdit = (post: Post) => {
    if (post.author !== user?.username) return;
    setEditPostId(post.id);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditPostId(null);
    setEditContent("");
  };

  const saveEdit = () => {
    if (!editContent.trim() || editPostId === null) return;
    setPosts((prev) =>
      prev.map((p) =>
        p.id === editPostId ? { ...p, content: editContent } : p
      )
    );
    cancelEdit();
  };

  const confirmDelete = (id: number) => {
    setDeletePostId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deletePostId === null) return;
    setPosts((prev) => prev.filter((p) => p.id !== deletePostId));
    setDeleteDialogOpen(false);
    setDeletePostId(null);
  };

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchCategory =
        filterCategory === "All" || post.category === filterCategory;
      const matchKeyword =
        searchKeyword.trim() === "" ||
        post.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        post.author.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchCategory && matchKeyword;
    });
  }, [posts, filterCategory, searchKeyword]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  );

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Discussion Forum
      </Typography>

      {/* 分类 + 搜索 */}
      <Stack direction="row" spacing={2} mb={3} alignItems="center">
        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={filterCategory}
            label="Category"
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            {CATEGORIES.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Search posts"
          variant="outlined"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          sx={{ flexGrow: 1 }}
        />
      </Stack>

      {/* 发帖 */}
      {user && (
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Create a Post</Typography>
            <TextField
              fullWidth
              multiline
              rows={3}
              label="What's on your mind?"
              sx={{ my: 2 }}
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
            />
            <FormControl sx={{ minWidth: 120, mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newPostCategory}
                label="Category"
                onChange={(e) => setNewPostCategory(e.target.value)}
              >
                {CATEGORIES.filter((c) => c !== "All").map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" onClick={handlePostSubmit}>
              Post
            </Button>
          </CardContent>
        </Card>
      )}


      
      {/* 帖子列表 */}
      {currentPosts.map((post) => (
        <Card key={post.id} sx={{ mb: 2 }}>
          <CardContent>
            <Grid container alignItems="center" spacing={2}>
              <Grid item>
                <Avatar>{post.author}</Avatar>
              </Grid>
              <Grid item xs>
                <Typography variant="subtitle1" fontWeight="bold">
                  {post.author} — <i>{post.category}</i>
                </Typography>
                <Typography variant="body2" sx={{ mb: 1 }}>
                  {dayjs(post.timestamp).fromNow()}
                </Typography>

                {editPostId === post.id ? (
                  <>
                    <TextField
                      multiline
                      fullWidth
                      minRows={3}
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      sx={{ mb: 1 }}
                    />
                    <Stack direction="row" spacing={1}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        startIcon={<Save />}
                        onClick={saveEdit}
                      >
                        Save
                      </Button>
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        startIcon={<Cancel />}
                        onClick={cancelEdit}
                      >
                        Cancel
                      </Button>
                    </Stack>
                  </>
                ) : (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ cursor: "pointer" }}
                    onClick={() => navigate(`/forum/${post.id}`)}
                  >
                    {post.content}
                  </Typography>
                )}
              </Grid>

              {post.author === user?.username && editPostId !== post.id && (
                <Grid item>
                  <IconButton
                    color="primary"
                    onClick={() => startEdit(post)}
                    size="small"
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => confirmDelete(post.id)}
                    size="small"
                  >
                    <Delete />
                  </IconButton>
                </Grid>
              )}
            </Grid>
          </CardContent>
        </Card>
      ))}

      {/* 分页 */}
      {totalPages > 1 && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, val) => setCurrentPage(val)}
            color="primary"
          />
        </Stack>
      )}

      {/* 删除弹窗 */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this post?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>Cancel</Button>
          <Button color="error" onClick={handleDelete}>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Forum;
