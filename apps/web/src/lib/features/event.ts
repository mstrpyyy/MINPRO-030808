const base_url = process.env.BASE_URL

export const getEvent = async () => {
    const res = await fetch(`http://localhost:8000/api/event`, { next: {  revalidate: 10 } })
    const data = await res.json()

    return data
}

export const getEventSlug = async (slug: string) => {
    const res = await fetch(`http://localhost:8000/api/event/${slug}`, { next: {  revalidate: 3600 } })
    const data = await res.json()

    return data
}

// export const getEventReview = async () => {
//     const res = await fetch(`http://localhost:8000/api/event/review`,{next: {revalidate:3600} })
//     const data = await res.json()

//     return data
// }
