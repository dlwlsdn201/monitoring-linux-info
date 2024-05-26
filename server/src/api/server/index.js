export const CREATE_SERVER_INFO = async ({ name, ip_address }) =>
  await pool.query(
    "INSERT INTO servers (name, ip_address) VALUES ($1, $2) RETURNING *",
    [name, ip_address],
  );
