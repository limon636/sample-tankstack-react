import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getPost, createPost, editPost } from './postapi';
import Loading from '@/components/Loading';
import { Link } from 'react-router-dom';

const List = () => {
    // Access the client
    const queryClient = useQueryClient();

    // Queries
    const { data, isPending, error } = useQuery({
        queryKey: ['posts'],
        queryFn: getPost,
    });
    console.log(data);
    // Mutations
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const edit = useMutation({
        mutationFn: editPost,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    if (isPending) return <Loading />;
    if (error) return <div>Error occured</div>;
    return (
        <div>
            <div className="flex justify-between py-2">
                <h1 className="text-xl font-bold text-red-700">All Post</h1>
                <Link to="/post/create" className="btn">
                    Create
                </Link>
            </div>

            <div className="w-full">
                <table className="striped-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data?.map((post) => (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <Link to={`/post/${post.id}`}>Edit</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex space-x-4">
                <button
                    onClick={() => {
                        mutation.mutate({
                            id: Date.now(),
                            title: 'Do Laundry',
                            body: 'Do Laundry to nearest shop',
                            userId: 5,
                        });
                    }}>
                    Add Post
                </button>
                <button
                    onClick={() => {
                        edit.mutate({
                            id: 10,
                            title: 'Do not Laundry',
                            body: 'Do Laundry to nearest shop',
                            userId: 5,
                        });
                    }}>
                    Edit Post
                </button>
            </div>
        </div>
    );
};

export default List;
