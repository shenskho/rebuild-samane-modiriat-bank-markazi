import axios from '@configs/axios'
import urls from './urls'

export async function getAllCategory() {
  return await axios.get(urls.category.getAllCategory)
}
export async function createCategory(data) {
  return await axios.post(urls.category.createCategory,data)
}

export async function removeCategory(data) {
  return await axios.post(urls.category.removeCategory,data)
}


export async function updateCategory(data) {
  return await axios.post(urls.category.updateCategory,data)
}






