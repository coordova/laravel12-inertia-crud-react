import Layout from '@/layouts/app-layout'
import { Head } from '@inertiajs/react'
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Posts',
        href: '/posts',
    },
]
export default function index({}) {
    return (
        <Layout breadcrumbs={breadcrumbs}>
            <Head title="Posts"/>
            <h1>index</h1>
        </Layout>
    )
}
