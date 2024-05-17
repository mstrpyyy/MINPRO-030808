'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
 
export async function createToken(token: string, url: string) {
  cookies().set('token', token)
  redirect(url)
}

export async function getToken() {
    return cookies().get("token")
}

export async function deleteToken(key: string) {
  cookies().delete(key)
}

export async function getEvents() {
  const token = cookies().get("token")

  const res = await fetch('http://localhost:8000/api/events', {
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Authorization": `Bearer ${token?.value}`
    }
  })
    const data = await res.json()
    return data
}

export async function getEventSlug(slug:string) {
  const token = cookies().get("token")
  const res = await fetch(`http://localhost:8000/api/events/${slug}`, {
    method: 'GET',
    headers: {
      "Content-Type" : "application/json",
      "Authorization" : `Bearer ${token?.value}`
    }
  })
  const data = await res.json()
  return data
}

export async function getWaitingTransactionSlug(slug:string) {
  const res = await fetch(`http://localhost:8000/api/transactions/waiting-confirmation/${slug}`, { next: {revalidate: 1}})
  const data = await res.json()
  console.log(data);
  return data
}
