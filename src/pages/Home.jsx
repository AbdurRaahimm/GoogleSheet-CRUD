import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts } from '../redux/postsSlice';
import { Link } from 'react-router-dom';

export default function Home() {
    const [search, setSearch] = useState('');
    const { posts, isLoading, isError } = useSelector(state => state.posts)
    // console.log(posts)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchPosts());
    }, [])
    return (
        <section className='my-5 '>
            <div className="flex justify-between px-3">
                <h1 className='text-2xl text-center font-bold'>Posts</h1>
                <input type="search" name="" onChange={(e) => setSearch(e.target.value)} placeholder='Search Posts..' className='block w-72 px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6' />
            </div>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 p-5 '>
                {
                    isLoading ?
                        <>
                            <div className="animate-pulse flex space-x-4">
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-400 rounded w-3/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-400 rounded"></div>
                                        <div className="h-4 bg-gray-400 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </> :
                        isError ? <p>Something went wrong</p> :
                            posts.length === 0 ? <p>No posts found</p> :
                                posts
                                    .filter(post => post[1].toLowerCase().includes(search.toLowerCase()))
                                    .map((post, index) => (
                                        <div key={index} className='border p-2 shadow-md rounded-md'>
                                            <h2 className='text-xl font-bold capitalize'>
                                                <Link to={`/post-details/${post[0]}`} state={post} >{post[1]}</Link>
                                            </h2>
                                            <p>{post[2].slice(0, 100)}</p>
                                            <Link to={`/post-details/${post[0]}`} state={post}><img src={post[3]} alt={post[1]} className='w-full h-40 object-cover' /></Link>                                           
                                        </div>
                                    ))

                }
            </div>
        </section>
    )
}

