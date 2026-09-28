export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      articles: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string | null
          cover_image: string | null
          category: string | null
          reading_time: string | null
          status: 'draft' | 'published'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          category?: string | null
          reading_time?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string | null
          cover_image?: string | null
          category?: string | null
          reading_time?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      podcasts: {
        Row: {
          id: string
          episode_number: number | null
          title: string
          slug: string
          description: string | null
          cover_image: string | null
          audio_url: string | null
          duration: string | null
          status: 'draft' | 'published'
          published_at: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          episode_number?: number | null
          title: string
          slug: string
          description?: string | null
          cover_image?: string | null
          audio_url?: string | null
          duration?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          episode_number?: number | null
          title?: string
          slug?: string
          description?: string | null
          cover_image?: string | null
          audio_url?: string | null
          duration?: string | null
          status?: 'draft' | 'published'
          published_at?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          created_at?: string
        }
        Relationships: []
      }
      comments: {
        Row: {
          id: string
          article_id: string | null
          name: string
          email: string | null
          content: string
          status: 'pending' | 'approved' | 'rejected'
          created_at: string
        }
        Insert: {
          id?: string
          article_id?: string | null
          name: string
          email?: string | null
          content: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string | null
          name?: string
          email?: string | null
          content?: string
          status?: 'pending' | 'approved' | 'rejected'
          created_at?: string
        }
        Relationships: []
      }
      echoes: {
        Row: {
          id: string
          article_id: string | null
          visitor_id: string
          created_at: string
        }
        Insert: {
          id?: string
          article_id?: string | null
          visitor_id: string
          created_at?: string
        }
        Update: {
          id?: string
          article_id?: string | null
          visitor_id?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
