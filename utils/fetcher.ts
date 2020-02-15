import fetch from 'unfetch'

export default async function fetcher(path: string) {
  const token = localStorage.getItem('token')

  if (token) {
    const res = await fetch(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const json = await res.json()
    return json
  } else {
    const res = await fetch(path)
    const json = await res.json()
    return json
  }
}
