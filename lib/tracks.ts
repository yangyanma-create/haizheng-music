import albumData from '@/data/album.json'
import tracksData from '@/data/tracks.json'

export type Track = {
  slug: string
  title: string
  titleEn: string
  cover: string
  lyrics: string
  story: string
  spotify: string
  appleMusic: string
  youtube: string
  buyLink: string
}

export type Album = {
  title: string
  titleEn: string
  year: string
  cover: string
  description: string
  taglines: string[]
  credits: string[]
  social: {
    instagram: string
    facebook: string
    website: string
  }
  buyLink: string
}

export const album: Album = albumData
export const tracks: Track[] = tracksData

export function getTrackBySlug(slug: string): Track | undefined {
  return tracks.find((t) => t.slug === slug)
}

export function getAllSlugs(): string[] {
  return tracks.map((t) => t.slug)
}
