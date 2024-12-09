export default function createFormDataFromJSON(object: any): FormData {
  const formData = new FormData()
  const entries = Object.entries(object)

  for(let [key, value] of entries) {
    if(value instanceof FileList) {
      for(let file in value) formData.append(value[file].name, value[file])
    } else {
      formData.append(key, value as string)
    }
  }

  return formData
}