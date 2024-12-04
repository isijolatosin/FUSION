export default function generateUniqueId(prefix = "") {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 10);
  return `${prefix}${timestamp}-${random}`;
}
