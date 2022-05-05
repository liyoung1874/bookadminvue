import request from '@/utils/request';

export const createBook = (data) => {
  return request({
    url:'/book/create',
    method:'post',
    data
  })
}

export const updateBook = (data) => {
  return request({
    url:'/book/update',
    method:'post',
    data
  })
}

export const getBook = (fileName) => {
  return request({
    url:'/book/get',
    method:'get',
    params: { fileName },
  })
}