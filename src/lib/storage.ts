import fs from "fs"

const UPLOAD_DIR = "uploads"

function getUploadDir(): string {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true })
  return UPLOAD_DIR
}

export async function saveFile(buffer: Buffer, filename: string): Promise<string> {
  const sanitized = filename.replace(/[^a-zA-Z0-9._-]/g, "_")
  const storageKey = `${Date.now()}-${sanitized}`
  const filePath = `${getUploadDir()}/${storageKey}`
  await fs.promises.writeFile(filePath, buffer)
  return storageKey
}

export function getFilePath(storageKey: string): string {
  return `${getUploadDir()}/${storageKey}`
}

export async function deleteFile(storageKey: string): Promise<void> {
  const filePath = `${getUploadDir()}/${storageKey}`
  if (fs.existsSync(filePath)) await fs.promises.unlink(filePath)
}
