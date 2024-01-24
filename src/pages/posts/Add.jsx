import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Formik, Field, Form } from 'formik';
import { createPost } from './postapi';

const Add = () => {
    const queryClient = useQueryClient();
    // Mutations
    const mutation = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
    });

    const validate = (values) => {
        const errors = {};
        if (!values.id) {
            errors.id = 'Required';
        } else if (values.id.length > 15) {
            errors.id = 'Must be 15 characters or less';
        }

        if (!values.title) {
            errors.title = 'Required';
        } else if (values.title.length > 20) {
            errors.title = 'Must be 20 characters or less';
        }
        return errors;
    };

    const onSubmit = async (values) => {
        // await new Promise((r) => setTimeout(r, 500));
        // alert(JSON.stringify(values, null, 2));
        mutation.mutate(JSON.stringify(values));
    };
    return (
        <div>
            <Formik
                initialValues={{
                    id: '',
                    title: '',
                }}
                validate={validate}
                onSubmit={onSubmit}>
                <Form>
                    <label htmlFor="id">ID</label>
                    <Field id="id" name="id" placeholder="ID" />
                    {formik.errors.id ? <div>{formik.errors.id}</div> : null}
                    <label htmlFor="title">Title</label>
                    <Field id="title" name="title" placeholder="Title" />

                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </div>
    );
};

export default Add;
