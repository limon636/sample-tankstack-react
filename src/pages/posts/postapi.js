import myapi from '@/service/myapi';

export const getPost = () => myapi.get('/posts').then((res) => res);
export const createPost = (param) =>
    myapi.post('/posts', param).then((res) => res);
export const editPost = (param) =>
    myapi.put(`/posts/${param.id}`, param).then((res) => res);
