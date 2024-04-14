import React from 'react'
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { updatePost } from '../redux/postsSlice';
import { toast } from 'react-toastify';

export default function PostUpdate() {
    const locate = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = locate.state;
    // console.log(post)
    const handleUpdatePost = (e) => {
        e.preventDefault()
        try {
            const form = e.target
            const formData = new FormData(form)
            const title = formData.get('title')
            const content = formData.get('content')
            const updatedData = {
                id: post[0],
                title,
                content,
                Photo: post[3]
            }
            console.log(updatedData)
            dispatch(updatePost(updatedData));
            toast.success('Post updated successfully');
            form.reset();
            navigate('/');
        } catch (err) {
            toast.error(err.message)

        }
    }
    return (
        <section className='shadow py-5 my-5 rounded-md w-6/12 mx-auto px-3'>
            <h1 className='text-2xl text-center'>Update Post</h1>
            <form className='flex flex-col justify-center align-middle' onSubmit={handleUpdatePost}>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title :
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="title"
                        defaultValue={post[1]}
                        id="title"
                        autoComplete="given-title"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <label htmlFor="content" className="block text-sm font-medium leading-6 text-gray-900">
                    Content :
                </label>
                <div className="mt-2">
                    <textarea
                        name="content"
                        defaultValue={post[2]}
                        id="content"
                        autoComplete="given-content"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <button type='submit' className='bg-blue-500 text-white py-2 mt-3 rounded-md'>
                    Update Post
                </button>
            </form>
        </section>
    )
}
