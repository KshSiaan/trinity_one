export interface AdminDBType{
  status: string
  message: string
  data: Data
}

export interface Data {
  summary: Summary
  top_5_categories: Top5Category[]
  top_5_departments: Top5Department[]
  department_employee_stats: DepartmentEmployeeStat[]
}

export interface Summary {
  active_employee: number
  goal_completion_rate: number
  engagement_score: number
  manager_activity: number
}

export interface Top5Category {
  category_name: string
  value: number
}

export interface Top5Department {
  name: string
  value: number
}

export interface DepartmentEmployeeStat {
  name: string
  value: number
}
