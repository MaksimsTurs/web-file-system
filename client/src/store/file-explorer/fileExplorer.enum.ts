export enum ExplorerItemTypes {
  FILE = 'FILE',
  FOLDER = 'FOLDER'
}

export enum ExplorerMoveDirections {
  FORWARD = 'FORWARD',
  BACKWARD =  'BACKWARD'
}

export enum ExplorerModes {
  IS_COPY_MODE = 'IS_COPY_MODE',
  IS_MOVE_MODE = 'IS_MOVE_MODE',
  IS_DELETE_MODE = 'IS_DELETE_MODE',
  IS_INSERT_FILE_MODE = 'IS_INSERT_FILE_MODE',
  IS_INSERT_FOLDER_MODE = 'IS_INSERT_FOLDER_MODE',
  IS_INITIALIZED = 'IS_INITIALIZED'
}

export enum ExplorerConfiguratinsKeys {
  WORKSPACES = 'workSpaces',
  EXCLUDE_PATHS = 'excludePaths'
}