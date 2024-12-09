export const IMG_EXTENTIONS: string[] = ['webp', 'png', 'jpg', 'jpeg']
export const VIDEO_EXTENTIONS: string[] = ['mp4', 'MP4']
  export const CREATE_FILE_OPTION = {
    SIMPLE_TEXT_FILE: 'simple-text-file',
    DOWNLOAD_FROM_URL: 'download-from-url',
    FROM_FILE_SYSTEM: 'from-file-system'
  }
export const FILE_POSSIBLE_SOURCE_KEYS = {
  'https://www.youtube.com': 'YOUTUBE',
  'https://x.com':           'TWITTER',
  'https://pbs.twimg.com':   'PBS_TWIMG'
}
export const MEDIA_FILE_EXTENTIONS_REGEXP = /(webp|png|jpeg|jpg|gif|mp4|mp3|MP4)/
export const FILE_EXPLORER_ACTION_STEPS = {
  SELECT_FILES:  'SELECT_FILES',
  SELECT_TARGET: 'SELECT_TARGET',
  SEND:          'SEND'
}