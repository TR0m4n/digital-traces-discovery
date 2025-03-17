export const ALLOWED_MIME_TYPES = [
  'text/plain',
  'text/csv',
  'text/log',
  'application/json',
  'application/xml'
];

export const MIME_TYPE_EXTENSIONS: Record<string, string[]> = {
  'text/plain': ['.txt'],
  'text/csv': ['.csv'],
  'text/log': ['.log'],
  'application/json': ['.json'],
  'application/xml': ['.xml']
};

export function getMimeTypeFromExtension(extension: string): string | null {
  for (const [mimeType, extensions] of Object.entries(MIME_TYPE_EXTENSIONS)) {
    if (extensions.includes(extension.toLowerCase())) {
      return mimeType;
    }
  }
  return null;
}

export function getExtensionFromMimeType(mimeType: string): string | null {
  return MIME_TYPE_EXTENSIONS[mimeType]?.[0] || null;
} 