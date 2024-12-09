const STRING = {
  DEFAULT_EXCLUDE_PATHS: [
    /\.git/,
    /\.env\..*/,
    /node_modules/,
    /package\.json/
  ],
  FILE_EXPLORER_ITEM_TYPES: {
    FILE: 'FILE',
    FOLDER: 'FOLDER',
    IMAGE: 'IMAGE',
    VIDEO: 'VIDEO',
    AUDIO: 'AUDIO',
    TEXT: 'TEXT'
  },
  FILE_POSSIBLE_SOURCE: ['youtube', 'youtu.be', 'x.com', 'pbs.twimg.com'],
  FILE_POSSIBLE_SOURCE_KEYS: {
    'youtu.be':      'YOUTUBE',
    'x.com':         'TWITTER',
    'pbs.twimg.com': 'TWITTER'
  },
  IMG_EXTENTION: ['webp', 'jpg', 'jpeg', 'png', 'gif'],
  VIDEO_EXTENTION: ['mp4', 'MP4'],
  AUDIO_EXTENTION: ['mp3'],
}

export default STRING