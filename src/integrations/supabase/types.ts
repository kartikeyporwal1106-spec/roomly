export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      floors: {
        Row: {
          created_at: string
          floor_number: number
          hostel_id: string
          id: string
        }
        Insert: {
          created_at?: string
          floor_number: number
          hostel_id: string
          id?: string
        }
        Update: {
          created_at?: string
          floor_number?: number
          hostel_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "floors_hostel_id_fkey"
            columns: ["hostel_id"]
            isOneToOne: false
            referencedRelation: "hostels"
            referencedColumns: ["id"]
          },
        ]
      }
      hostels: {
        Row: {
          created_at: string
          gender: Database["public"]["Enums"]["gender_t"] | null
          hostel_name: string
          id: string
        }
        Insert: {
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_t"] | null
          hostel_name: string
          id?: string
        }
        Update: {
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_t"] | null
          hostel_name?: string
          id?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      preferences: {
        Row: {
          cleanliness: Database["public"]["Enums"]["cleanliness_t"] | null
          created_at: string
          drinking: boolean | null
          gaming: boolean | null
          hobbies: string[] | null
          languages: string[] | null
          music: string | null
          personality: Database["public"]["Enums"]["personality_t"] | null
          sleep_time: string | null
          smoking: boolean | null
          study_style: Database["public"]["Enums"]["study_style_t"] | null
          updated_at: string
          user_id: string
          wake_time: string | null
        }
        Insert: {
          cleanliness?: Database["public"]["Enums"]["cleanliness_t"] | null
          created_at?: string
          drinking?: boolean | null
          gaming?: boolean | null
          hobbies?: string[] | null
          languages?: string[] | null
          music?: string | null
          personality?: Database["public"]["Enums"]["personality_t"] | null
          sleep_time?: string | null
          smoking?: boolean | null
          study_style?: Database["public"]["Enums"]["study_style_t"] | null
          updated_at?: string
          user_id: string
          wake_time?: string | null
        }
        Update: {
          cleanliness?: Database["public"]["Enums"]["cleanliness_t"] | null
          created_at?: string
          drinking?: boolean | null
          gaming?: boolean | null
          hobbies?: string[] | null
          languages?: string[] | null
          music?: string | null
          personality?: Database["public"]["Enums"]["personality_t"] | null
          sleep_time?: string | null
          smoking?: boolean | null
          study_style?: Database["public"]["Enums"]["study_style_t"] | null
          updated_at?: string
          user_id?: string
          wake_time?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          branch: string | null
          created_at: string
          email: string | null
          gender: Database["public"]["Enums"]["gender_t"] | null
          id: string
          looking_status: Database["public"]["Enums"]["looking_status_t"] | null
          name: string | null
          onboarding_complete: boolean
          phone: string | null
          profile_photo: string | null
          roll_number: string | null
          room_id: string | null
          updated_at: string
          year: number | null
        }
        Insert: {
          bio?: string | null
          branch?: string | null
          created_at?: string
          email?: string | null
          gender?: Database["public"]["Enums"]["gender_t"] | null
          id: string
          looking_status?:
            | Database["public"]["Enums"]["looking_status_t"]
            | null
          name?: string | null
          onboarding_complete?: boolean
          phone?: string | null
          profile_photo?: string | null
          roll_number?: string | null
          room_id?: string | null
          updated_at?: string
          year?: number | null
        }
        Update: {
          bio?: string | null
          branch?: string | null
          created_at?: string
          email?: string | null
          gender?: Database["public"]["Enums"]["gender_t"] | null
          id?: string
          looking_status?:
            | Database["public"]["Enums"]["looking_status_t"]
            | null
          name?: string | null
          onboarding_complete?: boolean
          phone?: string | null
          profile_photo?: string | null
          roll_number?: string | null
          room_id?: string | null
          updated_at?: string
          year?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      roommate_requests: {
        Row: {
          created_at: string
          id: string
          message: string | null
          receiver_id: string
          sender_id: string
          status: Database["public"]["Enums"]["request_status_t"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id: string
          sender_id: string
          status?: Database["public"]["Enums"]["request_status_t"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string | null
          receiver_id?: string
          sender_id?: string
          status?: Database["public"]["Enums"]["request_status_t"]
          updated_at?: string
        }
        Relationships: []
      }
      rooms: {
        Row: {
          capacity: number
          created_at: string
          floor_id: string
          id: string
          room_number: string
        }
        Insert: {
          capacity?: number
          created_at?: string
          floor_id: string
          id?: string
          room_number: string
        }
        Update: {
          capacity?: number
          created_at?: string
          floor_id?: string
          id?: string
          room_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_floor_id_fkey"
            columns: ["floor_id"]
            isOneToOne: false
            referencedRelation: "floors"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "student"
      cleanliness_t: "very_tidy" | "tidy" | "average" | "messy"
      gender_t: "male" | "female" | "other" | "prefer_not_to_say"
      looking_status_t:
        | "looking_for_roommate"
        | "looking_for_room"
        | "not_looking"
      personality_t: "introvert" | "ambivert" | "extrovert"
      request_status_t: "pending" | "accepted" | "rejected" | "cancelled"
      study_style_t: "early_bird" | "night_owl" | "flexible"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "student"],
      cleanliness_t: ["very_tidy", "tidy", "average", "messy"],
      gender_t: ["male", "female", "other", "prefer_not_to_say"],
      looking_status_t: [
        "looking_for_roommate",
        "looking_for_room",
        "not_looking",
      ],
      personality_t: ["introvert", "ambivert", "extrovert"],
      request_status_t: ["pending", "accepted", "rejected", "cancelled"],
      study_style_t: ["early_bird", "night_owl", "flexible"],
    },
  },
} as const
