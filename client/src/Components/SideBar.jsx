import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import logo from "../assets/logo.png"
import { Link } from 'react-router-dom'

const navigation = [
  { name: 'Blogs', to: '/blogs' },
  { name: 'NewBlog', to: '/new-blog' },
  { name: 'About', to: '/about' },
  { name: 'Login', to: '/login' },
  { name: 'Register', to: '/register' },
]

const SideBar = () => {
  
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
    <section>
        <main>
            <section className='flex'>
            <Bars3Icon width="40px"/>
            </section>
        </main>
    </section>
    )
  
}

export default SideBar