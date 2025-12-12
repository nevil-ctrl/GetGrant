export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string | null;
    role?: string;
    profile_type?: "student" | "parent";
    phone?: string;
    manager_id?: number | null;
    created_at?: string;
    updated_at?: string;
}
