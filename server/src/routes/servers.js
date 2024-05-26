import { Router } from "express";
import { CREATE_SERVER_INFO } from "../api/server";

const router = Router();

// 신규 서버 추가 엔드포인트
router.post("/server-add", async (req, res) => {
  const { name, ip_address } = req.body;
  try {
    const result = await CREATE_SERVER_INFO({ name, ip_address });
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default servers;
