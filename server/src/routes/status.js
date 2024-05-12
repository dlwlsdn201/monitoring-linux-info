import { Router } from "express";

const router = Router();

router.get("/disk", async (req, res) => {
  try {
    console.group("Requested by:", req.url);
    const disk = await runCommand(diskCommand);

    const [diskStatus] = await Promise.all([disk]);
    const formattedDiskData = parseDiskData(diskStatus, FILE_SYSTEM);
    const timestamp = dayjs().format("YYYY-MM-DD HH:mm");

    const responseData = {
      payload: {
        diskStatus: formattedDiskData,
      },
      timestamp,
    };

    console.group("[[RESPONSE DATA]]");
    console.log("[payload]:", diskStatus);
    console.log("[timestamp]:", timestamp);
    console.groupEnd();
    res.status(200).json(responseData);

    console.groupEnd();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
