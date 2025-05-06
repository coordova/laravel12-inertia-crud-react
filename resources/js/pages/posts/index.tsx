import Layout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Post } from '@/types/custom.d';
import { Head, Link, useForm, usePage } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
];
// export default function index({ posts }: { posts: Post[] }) {
export default function index() {
    // get posts from props, usePage is a hook that returns the current page props, props are passed from the server to the client
    const { posts } = usePage<{ posts: Post[] }>().props;
    // useForm is a hook that returns the current form state, it is used to handle form submissions
    const { post, reset } = useForm();
    // destroy is a function that is used to delete a post, it is used in the delete button
    const destroy = (id: number) => {
        // post is a function that is used to make a post request, it is used to delete a post
        post(route('posts.destroy', id), {
            // onFinish is a function that is used to handle the response from the server, it is used to reset the form
            onFinish: () => reset(),
        });
    };
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Posts" />

            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {/* Create Post Button */}
                <div>
                    <Link
                        href={route('posts.create')}
                        className="rounded-lg bg-green-700 px-3 py-2 text-xs font-medium text-white hover:bg-green-800 focus:ring-4 focus:ring-green-300 focus:outline-none dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                        Create Post
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-zinc-500 dark:text-zinc-400">
                        <thead className="bg-zinc-50 text-xs text-zinc-700 uppercase dark:bg-zinc-700 dark:text-zinc-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    ID
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Title
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Body
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post) => (
                                <tr
                                    key={post.id}
                                    className="border-b border-zinc-200 odd:bg-white even:bg-zinc-50 dark:border-zinc-700 odd:dark:bg-zinc-900 even:dark:bg-zinc-800"
                                >
                                    <td className="px-6 py-2 font-medium text-zinc-900 dark:text-white">{post.id}</td>
                                    <td className="px-6 py-2 text-zinc-600 dark:text-zinc-300">{post.title}</td>
                                    <td className="px-6 py-2 text-zinc-600 dark:text-zinc-300">{post.body}</td>
                                    <td className="px-6 py-2">
                                        <Link
                                            href={route('posts.edit', post.id)}
                                            className="rounded-lg bg-blue-700 px-3 py-2 text-xs font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => destroy(post.id)}
                                            className="ml-1 rounded-lg bg-red-700 px-3 py-2 text-xs font-medium text-white hover:bg-red-800 focus:ring-4 focus:ring-red-300 focus:outline-none dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </Layout>
    );
}
