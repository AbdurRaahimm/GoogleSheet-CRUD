import React from 'react'
import { Link } from 'react-router-dom'

export default function Navber() {
    return (
        <header className='flex justify-between align-middle shadow-md py-3 px-2'>
           <Link to={`/`}><h1 className='font-bold text-xl'>GoogleSheet CRUD</h1></Link>
            <nav >
                <ul className='flex justify-between space-x-2 '>
                    <li className='border-r-2 pr-2'>
                        <Link to='/'>Home</Link>
                    </li>
                    <li className='border-r-2 pr-2'>
                        <Link to='create-post'>Create Post</Link>
                    </li>
                    <li>Contact</li>
                </ul>
            </nav>
        </header>
    )
}
