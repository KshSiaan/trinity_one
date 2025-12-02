import { howl } from "../utils"


export const getUsersApi = async (
  token: string,
  page:number = 1
):Promise<{
  status: string
  message: string
  data: {
    current_page: number
    data: Array<{
      id: number
      user_id: number
      manager_id: number
      department_id: number
      status: string
      created_at: string
      updated_at: string
      user: {
        id: number
        name: string
        email: string
        employee_pin: string
        email_verified_at: any
        contact_number: any
        avatar: string
        is_banned: number
        is_notification: number
        is_subscribed: any
        trial_ends_at: any
        ends_at: any
        role: string
        created_at: string
        updated_at: string
      }
      manager: {
        id: number
        name: string
        email: string
      }
      department: {
        id: number
        name: string
      }
    }>
    first_page_url: string
    from: number
    last_page: number
    last_page_url: string
    links: Array<{
      url?: string
      label: string
      page?: number
      active: boolean
    }>
    next_page_url: any
    path: string
    per_page: number
    prev_page_url: any
    to: number
    total: number
  }
}
> =>{
    return howl(`/manage-user/index?per_page=12&page=${page}`, {
    method: "GET",
    token,
  });
}


export const createUserApi = async (
  body: FormData,
  token: string) => {
  return howl(`/manage-user/store`, {
    body,
    method: "POST",
    token,
  });
}



// Drem  and  mentorship related api 


export const getDremMentorApi = async (
  token: string
):Promise<{
    status:string,
    message:string,
    data : {
       current_page: number,
      data:{
      
              id:number,
                goal_name: string,
                assign_by: number,
                employee_id: number,
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
    }
}> => {
  return howl(`/manager/dream-mentor`, {
    method: "GET",
    token,
  });
};



// dream create 

export const createDreamApi = async (
  body: FormData,
  token: string
) => {
  return howl(`/manager/goal-generate`, {
    body,
    method: "POST",
    token,
  });
};