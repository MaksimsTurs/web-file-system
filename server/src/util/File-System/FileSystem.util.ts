import type { FileSystemUtil } from "./FileSystem.type";

import is from "./properties/is.property";
import manipulate from "./properties/manipulate.property";
import path from "./properties/path.property";

const FileSystem: FileSystemUtil = {
  is,
  manipulate,
  path
}

export default FileSystem