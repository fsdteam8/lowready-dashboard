import EditBlogComponent from '@/components/blog/EditBlogPage';
import React from 'react'


export default function page({ params }: { params: { id: string } }) {
  return <EditBlogComponent blogId={params.id} />;
}