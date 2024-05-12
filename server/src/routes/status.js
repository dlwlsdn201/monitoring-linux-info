import { Router } from "express";
import { requestDiskStatusAPI, requestCpuStatusAPI } from "../api/status";

const router = Router();
// 서버의 CPU 사용 현황 제공 API
router.get("/cpu", async (req, res) => {
  console.group("requested by:", req.url);
  try {
    const result = await requestCpuStatusAPI();
    console.log("🟢 return data:", result);
    console.groupEnd();
    return res.status(200).json(result);
  } catch (error) {
    console.groupEnd();
    return res.status(500).json({ error: error.message });
  }
});
// 서버의 물리 디스크 사용 현황 제공 API
router.get("/disk", async (req, res) => {
  console.group("requested by:", req.url);
  try {
    const result = await requestDiskStatusAPI();
    console.log("🟢 return data:", result);
    console.groupEnd();
    return res.status(200).json(result);
  } catch (error) {
    console.log({ error });
    console.groupEnd();
    return res.status(500).json({ error: error.message });
  }
});

export default router;
