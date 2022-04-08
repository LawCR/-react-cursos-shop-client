// Layout
import { LayoutAdmin } from "../layout/LayoutAdmin";
import { LayoutBasic } from "../layout/LayoutBasic";

// Admin Pages
import { Admin } from "../pages/Admin";
import { SignIn } from "../pages/Admin/SignIn";
import { Users } from "../pages/Admin/Users"
import { MenuWeb } from "../pages/Admin/MenuWeb";
import { CoursesAdmin } from "../pages/Admin/CoursesAdmin";
import BlogAdmin from '../pages/Admin/Blog'

// Pages Normal
import { Home } from "../pages/Home";
import { Contact } from "../pages/Contact";
import { Courses } from "../pages/Courses";
import { Blog } from "../pages/Blog";

// Other
import { Error404 } from "../pages/Error404";



const routes = [
    {
        path: "/admin",
        exact: false,
        component: LayoutAdmin,
        routes: [
            {
                path: "/admin",
                exact: true,
                component: Admin
            }, 
            {
                path: "/admin/login",
                exact: true,
                component: SignIn
            },
            {
                path: "/admin/users",
                exact: true,
                component: Users
            },
            {
                path: "/admin/menu",
                exact: true,
                component: MenuWeb
            },
            {
                path: "/admin/courses",
                exact: true,
                component: CoursesAdmin
            },
            {
                path: "/admin/blog",
                exact: true,
                component: BlogAdmin
            },
            {
                component: Error404
            },
        ]
    },
    {
        path: "/",
        exact: false,
        component: LayoutBasic,
        routes: [
            {
                path: "/",
                exact: true,
                component: Home
            },
            {
                path: '/contact',
                exact: true,
                component: Contact
            },
            {
                path: '/courses',
                exact: true,
                component: Courses
            },
            {
                path: '/blog',
                exact: true,
                component: Blog
            },
            {
                path: '/blog/:url',
                exact: true,
                component: Blog
            },
            {
                component: Error404
            }
        ]
    }
]

export default routes
