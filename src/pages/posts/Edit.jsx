import myapi from '@/service/myapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const UpdatePost = () => {
    const { id } = useParams();
    const updatePost = async (data) => {
        const response = await myapi.patch(`/posts/${data.id}`, data);
        return response.data;
    };

    const queryClient = useQueryClient();
    // const mutation = useMutation((data) => updatePost(id, data), {
    //     onSuccess: () => {
    //         console.log('updated');
    //         queryClient.invalidateQueries('posts');
    //     },
    // });
    const edit = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        edit.mutate(Object.fromEntries(formData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="hidden" name="id" value={id} />
            <textarea
                className="textarea textarea-lg textarea-info mt-20 w-full max-w-xs"
                placeholder="post"
                name="body"
            />
            <br />
            <button className="btn btn-success" type="submit">
                Update post
            </button>
        </form>
    );
};

export default UpdatePost;
