import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  TextField,
  Avatar,
  Grid,
  Pagination,
  Stack,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Edit, Delete, Save, Cancel } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

type Post = {
  id: number;
  author: string;
  content: string;
  timestamp: string;
  category: string;
};

const POSTS_PER_PAGE = 5;
const CATEGORIES = ["All", "General", "Tech", "News", "Sports"];

const Forum = () => {
  const navigate = useNavigate();

  // 模拟当前登录用户
  const currentUser = "CurrentUser";

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "User1",
      content: "Welcome to the forum! This is a General post.",
      timestamp: dayjs().subtract(1, "hour").toISOString(),
      category: "General",
    },
    {
      id: 2,
      author: "User2",
      content: "Tech news today: React 19 released!",
      timestamp: dayjs().subtract(2, "hour").toISOString(),
      category: "Tech",
    },
    {
      id: 3,
      author: "User3",
      content: "Big game last night in sports.",
      timestamp: dayjs().subtract(3, "hour").toISOString(),
      category: "Sports",
    },
    // ... 更多初始数据
  ]);

  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("General");
  const [currentPage, setCurrentPage] = useState(1);

  // 编辑帖子相关状态
  const [editPostId, setEditPostId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");

  // 删除帖子弹窗相关
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);

  // 筛选和搜索
  const [filterCategory, setFilterCategory] = useState("All");
  const [searchKeyword, setSearchKeyword] = useState("");

  // 过滤 + 搜索帖子
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesCategory =
        filterCategory === "All" || post.category === filterCategory;
      const matchesKeyword =
        searchKeyword.trim() === "" ||
        post.content.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        post.author.toLowerCase().includes(searchKeyword.toLowerCase());
      return matchesCategory && matchesKeyword;
    });
  }, [posts, filterCategory, searchKeyword]);

  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const indexOfLast = currentPage * POSTS_PER_PAGE;
  const indexOfFirst = indexOfLast - POSTS_PER_PAGE;
  const currentPosts = filteredPosts.slice(indexOfFirst, indexOfLast);

  const handlePostSubmit = () => {
    if (!newPostContent.trim()) return;
    const newPost: Post = {
      id: posts.length + 1,
      author: currentUser,
      content: newPostContent.trim(),
      timestamp: new Date().toISOString(),
      category: newPostCategory,
    };
    setPosts([newPost, ...posts]);
    setNewPostContent("");
    setNewPostCategory("General");
    setCurrentPage(1);
  };

  const startEdit = (post: Post) => {
    if (post.author !== currentUser) return;
    setEditPostId(post.id);
    setEditContent(post.content);
  };

  const cancelEdit = () => {
    setEditPostId(null);
    setEditContent("");
  };

  const saveEdit = () => {
    if (!editContent.trim()) return;
    setPosts((prev) =>
      prev.map((post) =>
        post.id === editPostId ? { ...post, content: editContent } : post
      )
    );
    cancelEdit();
  };

  const confirmDelete = (id: number) => {
    setDeletePostId(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = () => {
    if (deletePostId !== null) {
      setPosts((prev) => prev.filter((post) => post.id !== deletePostId));
    }
    setDeleteDialogOpen(false);
    setDeletePostId(null);
  };

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

      {/* 发帖框 */}
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

      {/* 帖子列表 */}
      {currentPosts.length === 0 ? (
        <Typography variant="body1" color="text.secondary" align="center" mt={4}>
          No posts found.
        </Typography>
      ) : (
        currentPosts.map((post) => (
          <Card key={post.id} sx={{ mb: 2 }}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar>{post.author[0]}</Avatar>
                </Grid>
                <Grid item xs>
                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    {post.author} — <i>{post.category}</i>
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    {dayjs(post.timestamp).fromNow()}
                  </Typography>

                  {/* 编辑状态 */}
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
                    <Typography variant="body1" color="text.secondary" sx={{ cursor: "pointer" }} onClick={() => navigate(`/forum/${post.id}`)}>
                      {post.content}
                    </Typography>
                  )}
                </Grid>

                {/* 操作按钮，仅当前用户可见 */}
                {post.author === currentUser && editPostId !== post.id && (
                  <Grid item>
                    <IconButton
                      color="primary"
                      aria-label="edit"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        startEdit(post);
                      }}
                    >
                      <Edit />
                    </IconButton>
                    <IconButton
                      color="error"
                      aria-label="delete"
                      size="small"
                      onClick={(e) => {
                        e.stopPropagation();
                        confirmDelete(post.id);
                      }}
                    >
                      <Delete />
                    </IconButton>
                  </Grid>
                )}
              </Grid>
            </CardContent>
          </Card>
        ))
      )}

      {/* 分页器 */}
      {totalPages > 1 && (
        <Stack alignItems="center" mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(_, value) => setCurrentPage(value)}
            color="primary"
          />
        </Stack>
      )}

      {/* 删除确认弹窗 */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>Delete Post</DialogTitle>
        <DialogContent>Are you sure you want to delete this post?</DialogContent>
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
