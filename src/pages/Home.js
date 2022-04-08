import React from 'react'
import {Helmet} from 'react-helmet'
import { HomeCourses } from '../components/Web/HomeCourses'
import { HowMyCoursesWork } from '../components/Web/HowMyCoursesWork'
import { MainBanner } from '../components/Web/MainBanner'
import { ReviewsCourses } from '../components/Web/ReviewsCourses'


export const Home = () => {
    return (
        <>
            <Helmet>
                <title>CursosReact</title>
                <meta name="description" content="Home | Web sobre programación" data-react-helmet="true" />
            </Helmet>
            <>
                <MainBanner />
                <HomeCourses />
                <HowMyCoursesWork />
                <ReviewsCourses />
            </>
        </>
    )
}
