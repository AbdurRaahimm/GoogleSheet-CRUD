import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addPost } from '../redux/postsSlice';
import { toast } from 'react-toastify';

export default function CreatePost() {
    const { posts, isLoading, isError } = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate();
    // console.log(posts)
    const handleCreatePost = (e) => {
        e.preventDefault()
        const form = e.target
        const formData = new FormData(form)
        const title = formData.get('title')
        const content = formData.get('content')
        const Photo = formData.get('file-upload')

        // Empty validation 
        if (!title || !content || !Photo) {
            toast.error('All fields are required')
            return
        }
        // file size validation less than 5MB
        const fileSize = Photo.size
        if (fileSize > 5 * 1024 * 1024) {
            toast.error('File size must be less than 5MB')
            return
        }
        // file type validation
        const fileType = Photo.type
        if (!fileType.includes('image')) {
            toast.error('File type must be an image')
            return
        }
        // make data url cover photo 
        const reader = new FileReader()
        reader.readAsDataURL(Photo)
        reader.onload = () => {
            const data = {
                title,
                content,
                Photo: reader.result
            }
            dispatch(addPost(data));
            toast.success('Post created successfully');
            form.reset();
            navigate('/');
        }
    }
    return (
        <section className='shadow py-5 my-5 rounded-md w-6/12 mx-auto px-3'>
            <h1 className='text-2xl text-center'>Create Post</h1>
            <form className='flex flex-col justify-center align-middle' onSubmit={handleCreatePost}>
                <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                    Title :
                </label>
                <div className="mt-2">
                    <input
                        type="text"
                        name="title"
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
                        id="content"
                        autoComplete="given-content"
                        className="block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="col-span-full">
                    <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                        Cover photo :
                    </label>
                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                        <div className="text-center">
                            {/* <PhotoIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                            <i className="bi bi-card-image text-3xl text-gray-300"></i>
                            <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                <label
                                    htmlFor="file-upload"
                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                >
                                    <span>Upload a file</span>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        accept='image/png, image/jpeg, image/gif'
                                        className="sr-only" />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                            </div>
                            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 5MB</p>
                        </div>
                    </div>
                </div>


                <button type='submit' className='bg-blue-500 text-white py-2 mt-3 rounded-md'>
                    {
                        isLoading ? 'Creating post...' : 'Create Post'
                    }
                </button>
            </form>
        </section>
    )
}
