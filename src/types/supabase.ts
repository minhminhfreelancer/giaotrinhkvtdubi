export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      curriculum: {
        Row: {
          assessments: Json | null
          created_at: string | null
          education_goal: string | null
          education_plan: string | null
          evangelism_goal: string | null
          evangelism_plan: string | null
          id: string
          is_completed: boolean | null
          management_plan: string | null
          month: number
          sermon_book_reflections: Json | null
          truth_book_reflections: Json | null
          updated_at: string | null
          user_id: string
          weekly_schedules: Json | null
        }
        Insert: {
          assessments?: Json | null
          created_at?: string | null
          education_goal?: string | null
          education_plan?: string | null
          evangelism_goal?: string | null
          evangelism_plan?: string | null
          id?: string
          is_completed?: boolean | null
          management_plan?: string | null
          month: number
          sermon_book_reflections?: Json | null
          truth_book_reflections?: Json | null
          updated_at?: string | null
          user_id: string
          weekly_schedules?: Json | null
        }
        Update: {
          assessments?: Json | null
          created_at?: string | null
          education_goal?: string | null
          education_plan?: string | null
          evangelism_goal?: string | null
          evangelism_plan?: string | null
          id?: string
          is_completed?: boolean | null
          management_plan?: string | null
          month?: number
          sermon_book_reflections?: Json | null
          truth_book_reflections?: Json | null
          updated_at?: string | null
          user_id?: string
          weekly_schedules?: Json | null
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role_id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role_id: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_completed_months: {
        Args: {
          p_user_id: string
        }
        Returns: {
          month: number
        }[]
      }
      get_curriculum_completion: {
        Args: {
          p_user_id: string
          p_month: number
        }
        Returns: {
          is_completed: boolean
        }[]
      }
      get_curriculum_data: {
        Args: {
          p_user_id: string
          p_month: number
        }
        Returns: {
          assessments: Json | null
          created_at: string | null
          education_goal: string | null
          education_plan: string | null
          evangelism_goal: string | null
          evangelism_plan: string | null
          id: string
          is_completed: boolean | null
          management_plan: string | null
          month: number
          sermon_book_reflections: Json | null
          truth_book_reflections: Json | null
          updated_at: string | null
          user_id: string
          weekly_schedules: Json | null
        }[]
      }
      get_curriculum_id: {
        Args: {
          p_user_id: string
          p_month: number
        }
        Returns: {
          id: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
