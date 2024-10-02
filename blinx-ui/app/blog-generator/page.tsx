/***
 *
 * @file app/blog-generator
 * @description Generate blogs page for a brand.
 * @author Satyam Mahajan
 * @organization KreativX
 * @since 21 Sep 2024
 *
 */


import dynamic from 'next/dynamic';
const BlogStates = dynamic(() => import("@/components/BlogStages"))
import './style.scss'

const BlogGenerator = () => {
    return(
        <div className="blog-generator-wrapper">
            <BlogStates />
        </div>
    )
}


export default BlogGenerator;