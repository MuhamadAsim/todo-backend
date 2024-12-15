export const healthCheck = (req, res) => {
    res.status(200).json({ status: "OK", message: "Service is healthy" });
  };
  