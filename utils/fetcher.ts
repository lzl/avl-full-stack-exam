import fetch from 'unfetch'

export default async function fetcher(path: string) {
  const res = await fetch(path)
  const json = await res.json()
  return json
}
