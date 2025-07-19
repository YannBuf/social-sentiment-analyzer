/**
import axios from "axios"

export async function fetchCurrentUser() {
  const token = localStorage.getItem("token")
  if (!token) return null
  try {
    const res = await axios.get("http://localhost:8000/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch {
    return null
  }
}*/


// api.ts
import axios from "axios"
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL;

// 获取监控列表，假设后端实现了返回当前用户监控列表接口
export async function fetchMonitors(token: string) {
  const res = await axios.get(`${API_BASE}/monitor/list`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// 创建新监控
export async function createMonitor(token: string, data: {
  name: string
  frequency: string
  keywords: string
  platforms: string[]
}) {
  const res = await axios.post(`${API_BASE}/monitor/create`, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// 修改已有监控
export async function updateMonitor(token: string, monitorId: number, data: any) {
  const response = await axios.put(
    `${API_BASE}/monitors/${monitorId}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response.data
}

// 获取监控状态
export async function fetchMonitorStatus(token: string, monitorId: number) {
  const res = await axios.get(`${API_BASE}/monitor/${monitorId}/status`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// 暂停监控
export async function pauseMonitor(token: string, monitorId: number) {
  const res = await axios.patch(`${API_BASE}/monitor/${monitorId}/pause`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// 恢复监控
export async function resumeMonitor(token: string, monitorId: number) {
  const res = await axios.patch(`${API_BASE}/monitor/${monitorId}/resume`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}

// 删除监控
export async function deleteMonitor(token: string, monitorId: number) {
  const res = await axios.delete(`${API_BASE}/monitor/${monitorId}/delete`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return res.data
}
