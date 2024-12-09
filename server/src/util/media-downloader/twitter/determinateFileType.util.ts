import STRING from "../../../const/string.const"

export default async function determinateFileType(URL: string) {
  const contentType: string | null = (await fetch(URL)).headers.get('content-type')

  if(/image.+/.test(contentType || '')) {
    return { 
      type: STRING.FILE_EXPLORER_ITEM_TYPES.IMAGE, 
      extention: contentType?.split(/\//).at(-1) 
    }
  } else {
    return { type: STRING.FILE_EXPLORER_ITEM_TYPES.VIDEO, extention: 'mp4' }
  }
}