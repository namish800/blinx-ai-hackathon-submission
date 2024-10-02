/***
 *
 * @file components/MenuBar
 * @description Menu Bar Component
 * @author Satyam Mahajan
 * @organization KreativX
 * @since 21 Sep 2024
 *
 */


"use client"


import Image from "next/image";
import Link from "next/link";
import Logo from "../../app/assets/images/blinx_logo.png";
import "./style.scss";
import { usePathname } from 'next/navigation'

const MenuBar = () => {
    const currentPath = usePathname();
    return(
        <div className="desktop-menu-wrapper">
            <Image 
                src={Logo}
                alt="logo"
                width={150}
            />
            <Link href={"/"} className={currentPath==="/" ? "desktop-menu-link active" : "desktop-menu-link"}>Home</Link>
            <Link href={"/persona"} className={currentPath.includes("persona") ? "desktop-menu-link active" : "desktop-menu-link"}>Brand Persona</Link>
            <Link href={"/blog-generator"} className={currentPath.includes("blog-generator") ? "desktop-menu-link active" : "desktop-menu-link"}>Blog Generator</Link>
            <Link href={"/ad-generator"} className={currentPath.includes("ad-generator") ? "desktop-menu-link active" : "desktop-menu-link"}>FB Ad Generator</Link>
            <Link href={"/post-generator"} className={currentPath.includes("post-generator") ? "desktop-menu-link active" : "desktop-menu-link"}>Post Generator</Link>
            <Link href={"/video-to-blog"} className={currentPath.includes("video-to-blog") ? "desktop-menu-link active" : "desktop-menu-link"}>Video To Blog</Link>
        </div>
    )
}



export default MenuBar