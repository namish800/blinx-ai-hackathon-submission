import { Poppins } from 'next/font/google';

export const poppins_init = Poppins({
    weight: ['400', '700'],
    style: ['normal'],
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins'
})



export const poppins = poppins_init.variable;