import { Router } from "express";
import requestDiskStatusAPI from "../api/status/disk";

const router = Router();

// 서버의 물리 디스크 사용 현황 제공 API
router.get("/disk", async (req, res) => {
  try {
    const result = await requestDiskStatusAPI();
    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default router;
