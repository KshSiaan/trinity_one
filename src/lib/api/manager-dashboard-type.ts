export interface TeamMemberType {
    id:number,
    member: string,
    goal_progress: number,
    engagement: string,
    kpi_status: string
}


export interface DreamType {
         
                id: number,
                goal_name: string,
                assign_by: number,
                employee_id:number,
                mentor_id: number,
                status: number,
                created_at: string,
                updated_at: string,
                employee: {
                    id: number,
                    name: string,
                    email: string,
                    avatar: string
                },
                mentor: {
                    id: 4,
                    name: string,
                    email: string,
        avatar: string
    }
            
}


export interface TeammemberType {
             id: 3,
                member: string,
                goal_progresa:number,
                engagement: string,
            kpi_status: string
}