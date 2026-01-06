import { howl } from "../utils";
import { AdminDBType } from "./admin-types";



export const adminDashboardApi = async(token:string,month?:string):Promise<AdminDBType>=>{
  return howl(`/admin-dashboard/index?month=${month}`,{token});
}


export const getCompaniesApi = async (
  token: string,
  {
    search = "",
    per_page = 10,
    page = 1,
  }: { search?: string; per_page?: number; page?: number } = {}
):Promise<{
  status: string
  message: string
  data: {
    current_page: number
    data: Array<{
      id: number
      company_name: string
      company_email: string
      company_phone: string
      company_address: string
      company_logo: string
      manager_full_name: string
      manager_email: string
      manager_phone: string
      manager_code: string
      send_welcome_email: number
      created_at: string
      updated_at: string
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
}> => {
  const query = new URLSearchParams({
    search,
    per_page: per_page.toString(),
    page: page.toString(),
  });

  return howl(`/company/index?${query.toString()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createCompanyApi = async (
  body: FormData,
  token: string
) => {
  return howl(`/company/store`, {
    body,
    method: "POST",
    token,
  });
};

export const getCompanyDetailsApi = async (
  id: string | number,
  token: string
):Promise<{
    status:string,
    message:string,
    data:{
      id: number
      company_name: string
      company_email: string
      company_phone: string
      company_address: string
      company_logo: string
      manager_full_name: string
      manager_email: string
      manager_phone: string
      manager_code: string
      send_welcome_email: number
      created_at: string
      updated_at: string
    }
}> => {
  return howl(`/company/view/${id}`, {
    method: "GET",
    token,
  });
};

export const updateCompanyApi = async (
  id: string | number,
  body: FormData,
  token: string
) => {
  return howl(`/company/update/${id}?_method=PUT`, {
    body,
    method: "POST",
    token,
  });
};

export const deleteCompanyApi = async (
  id: string | number,
  token: string) => {
  return howl(`/company/delete/${id}`, {
    method: "DELETE",
    token,
  });
}

//--------------Analytics APIs----------------//
export const getCompanyAnalyticsApi = async (
  token: string,
  month: number
):Promise<{
  status: boolean
  month: string
  departments: Array<{
    department_name: string
    value: number
  }>
  managerImpactAnalysis: Array<{
    manager_name: string
    manager_email: string
    manager_avatar: string
    dream_created: number
    dream_completed: number
    manager_user_count: number
    progress: number
  }>
  goalCompletedByCategory: Array<{
    category_name: string
    category_icon: string
    dream_created: number
    dream_completed: number
    progress: number
  }>
}
> => {
  const query = new URLSearchParams({
    month: month.toString(),
  });
    return howl(`/admin-dashboard/analytics?${query.toString()}`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`,
    },
    });
};

//--------------Category APIs----------------//
export const getCategoriesApi = async (
  token: string
):Promise<{
  status: string
  message: string
  data: {
    current_page: number
    data: Array<{
      id: number
      name: string
      icon: string
      created_at: string
      updated_at: string
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
> => {
  return howl(`/category/index`, {
    method: "GET",token});
};

export const addCategoryApi = async (
  token: string,
  body:FormData
) => {
  return howl(`/category/store`, {method:"POST",body,token});
};

export const updateCategoryApi = async (
  id:string|number,
  token: string,
  body:FormData
) => {
  return howl(`/category/update/${id}?_method=PUT`, {method:"POST",body,token});
};

export const deleteCategoryApi = async (
  id:string|number,
  token: string
) => {
  return howl(`/category/delete/${id}`, {method:"DELETE",token});
};


//--------------Terms APIs----------------//
export const getTermsApi = async (
  token?: string
):Promise<{
  status: string
  message: string
  data: {
    id: number
    content: string
    created_at: string
    updated_at: string
  }
}>=>{
  return howl(`/term-condition/index`, {
    method: "GET",token});
}
export const getPrivacy = async (
  token?: string
):Promise<{
  status: string
  message: string
  data: {
    id: number
    content: string
    created_at: string
    updated_at: string
  }
}>=>{
  return howl(`/privacy-policy/index`, {
    method: "GET",token});
}

export const updateTermsApi = async (
token: string, content: string)=>{
  return howl(`/term-condition/store`, {method:"POST",token,body:{content}});
}
export const updatePolicy = async (
token: string, content: string)=>{
  return howl(`/privacy-policy/store`, {method:"POST",token,body:{content}});
}

export const addReportApi = async (
  token: string,
  body: FormData
) => {
  return howl(`/admin-dashboard/create-report`, {method:"POST",body,token});
};

export const deleteReport = async (token: string,id:string|number)=>{
  return howl(`/admin-dashboard/delete-report/${id}`, {method:"DELETE",token});
}


export const createNotif = async (token: string, body:{name:string,message:string,role:string,status:string}):Promise<{
  status: string
  message: string
  data: {
    name: string
    message: string
    role: string
    status: string
    updated_at: string
    created_at: string
    id: number
  }
}>=>{
  return howl(`/notification/create`, {method:"POST",token,body});
}
export const updateNotifApi = async (token: string,id:string|number, body:{name:string,message:string,role:string,status:string}):Promise<{
  status: string
  message: string
  data: {
    name: string
    message: string
    role: string
    status: string
    updated_at: string
    created_at: string
    id: number
  }
}>=>{
  return howl(`/notification/update/${id}?_method=PUT`, {method:"POST",token,body});
}

export const deleteNotif = async (token: string,id:string|number)=>{
  return howl(`/notification/delete/${id}`, {method:"DELETE",token});
}


export const getSubsAPI = async (token: string):Promise<{
  status: string
  message: string
  data: {
    plans: Array<{
      id: number
      name: string
      price: string
      interval: string
      features: Array<string>
      is_active: boolean
      is_current: boolean
      is_trial_active: boolean
    }>
    user_subscription: any
  }
}
>=>{
return howl(`/subscription/plans`, {
method: 'GET',token});
}

export const updateSubsAPI = async (token: string,id:string|number,body:any):Promise<any>=>{
return howl(`/admin-dashboard/update-plan/${id}?_method=PUT`, {
method: "POST",token,body});
}




