import app from './app';

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Transaction Manager Server running on http://localhost:${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});