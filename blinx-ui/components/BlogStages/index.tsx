/***
 *
 * @file app/blog-generator
 * @description Generate blogs page for a brand.
 * @author Satyam Mahajan
 * @organization KreativX
 * @since 21 Sep 2024
 *
 */



"use client"

import LinearProgress from '@mui/material/LinearProgress';

import { useState } from "react";
import BlogProgress from '../BlogProgress';
import BlogViews from '../BlogViews';

interface Props {
    stage: number
}

const BlogStages = (props: any) => {
    // const {stage} = props;
    const [progress, setProgress] = useState(0);

    return(
        <div className='blogWrapperMain poppins'>
            {/* <h1>{`Blog View ${progress}`}</h1> */}
            <BlogProgress progress={progress} />
            <BlogViews progress={progress} setProgress={setProgress} />
        </div>
    )
}


export default BlogStages;