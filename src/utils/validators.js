export function validateUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

export function validateFileType(filename) {
  const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt'];
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return allowedExtensions.includes(ext);
}

export function validateVideoType(filename) {
  const allowedExtensions = ['.mp4', '.mov', '.avi', '.mkv'];
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return allowedExtensions.includes(ext);
}