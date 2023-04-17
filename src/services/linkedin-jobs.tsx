import axios, { AxiosError } from 'axios'
import { TEST_API_URL } from '../util/constants'

export interface JobsOptionsType {
  id?: string
  page?: number
  page_size?: number
  search?: string
}

export const fetchJobs = async (options?: JobsOptionsType) => {
  let params = {}

  if (options) {
    const { id, page, page_size, search } = options
    params = search
      ? { search }
      : {
          page,
          page_size,
          linkedin_account_id: id,
        }
  }
  try {
    const response: any = await axios.get(`${TEST_API_URL}/linkedin-job/get`, {
      withCredentials: true,
      headers: {
        Authorization: `${localStorage.getItem('access_token')}`,
      },
      params,
    })
    return response.data
  } catch (error) {
    console.log(error)
    return error as AxiosError
  }
}
