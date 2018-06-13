export const apiRequest = (
  type: 'POST' | 'PUT' | 'DELETE',
  data?: string,
  endpointExt: string = ''
) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(type, `/api/books${endpointExt}`, true)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({
          response: xhr.response,
          status: xhr.status
        })
      } else {
        reject({
          response: xhr.statusText,
          status: xhr.status
        })
      }
    }
    xhr.onerror = () => {
      reject({
        response: xhr.statusText,
        status: xhr.status
      })
    }
    xhr.send(data)
  })
