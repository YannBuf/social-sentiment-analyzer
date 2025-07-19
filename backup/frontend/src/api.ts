// src/api.ts
import axios from "axios";

const API_BASE = "http://localhost:8000"; // 根据你的后端地址修改

export const fetchPosts = async (category?: string, search?: string) => {
  const params: any = {};
  if (category && category !== "All") params.category = category;
  if (search) params.search = search;
  const response = await axios.get(`${API_BASE}/posts`, { params });
  return response.data;
};

export const createPost = async (postData: {
  user_id: number;
  content: string;
  category: string;
}) => {
  const response = await axios.post(`${API_BASE}/posts`, postData);
  return response.data;
};

export const updatePost = async (id: number, data:{
  content: string;
  category: string;
}) => {
  const res = await axios.put(`${API_BASE}/posts/${id}`, data);
  return res.data;
};

export const deletePost = async (id: number) => {
  await axios.delete(`${API_BASE}/posts/${id}`);
}

