import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Layout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Post } from '@/types/custom.d';
import { Textarea } from '@headlessui/react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle, Pencil } from 'lucide-react';
import { FormEventHandler } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Post Edit',
        href: '/posts',
    },
];

const Edit = () => {
    // get post from props, usePage is a hook that returns the current page props, props are passed from the server to the client
    const { post } = usePage<{ post: Post }>().props;

    // useForm is a hook that returns the current form state, it is used to handle form submissions
    const {
        data, // data is an object that is used to store the form data, it is used in the form onChange event
        setData, // setData is a function that is used to set the form data, it is used in the form onChange event
        // post: update, // update is a function that is used to update the post, it is used in the form onSubmit event
        processing, // processing is a boolean that is used to show the loading state, it is used in the form onSubmit event
        errors, // errors is an object that is used to show the form errors, it is used in the form onSubmit event
        reset, // reset is a function that is used to reset the form, it is used in the form onSubmit event
        put, // put is a function that is used to update the post, it is used in the form onSubmit event
    } = useForm({
        title: post.title || '',
        body: post.body || '',
    });

    // submit is a function that is used to submit the form, it is used in the form onSubmit event
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // put is a function that is used to update the post, it is used in the form onSubmit event
        put(route('posts.update', post.id), {
            onFinish: () => reset('title', 'body'),
        });
    };

    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Edit Post" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-start">
                    <Link
                        href={route('posts.index')}
                        className="rounded-lg bg-gray-700 px-3 py-2 text-xs font-medium text-white hover:bg-gray-800 focus:ring-4 focus:ring-gray-300 focus:outline-none dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                    >
                        Go Back
                    </Link>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>

                        <Input
                            id="title"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            // required
                            autoComplete="title"
                            placeholder="Title"
                        />

                        <InputError className="mt-2" message={errors.title} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="body">Body</Label>

                        <Textarea
                            id="body"
                            className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-15 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                            value={data.body}
                            onChange={(e: any) => setData('body', e.target.value)}
                            // required
                            autoComplete="body"
                            placeholder="Body"
                        />

                        <InputError className="mt-2" message={errors.body} />
                    </div>

                    <Button type="submit" disabled={processing}>
                        {processing ? <LoaderCircle className="mr-2 h-4 w-4 animate-spin" /> : <Pencil className="mr-2 h-4 w-4" />}
                        Save
                    </Button>
                </form>
            </div>
        </Layout>
    );
};

export default Edit;
