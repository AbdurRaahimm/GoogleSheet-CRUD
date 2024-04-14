import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { deletePost } from '../redux/postsSlice';
import { toast } from 'react-toastify';

export default function PostDetails() {
    const locate = useLocation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const post = locate.state;
    // console.log(post)
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            console.log(id)
            dispatch(deletePost(id));
            toast.success('Post deleted successfully');
            navigate('/');
        }
    }
    return (
        <section >
            <img src={post[3]} alt={post[1]} className='w-full h-80 object-cover' />
            <div className="flex justify-between p-2">
                <h1 className='text-3xl font-bold capitalize'>{post[1]}</h1>
                <div className="flex justify-end space-x-2">
                    {/* edit and delete button */}
                    <Link to={`/post-update/${post[0]}`} state={post} className='bg-blue-500 text-white px-2 py-1 rounded-md'>Edit</Link>
                    <button onClick={() => handleDelete(post[0])} className='bg-red-500 text-white px-2 py-1 rounded-md'>Delete </button>
                </div>
            </div>

            <p className='ml-3'>{post[2]}</p>

        </section>
    )
}
