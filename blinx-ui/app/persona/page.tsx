/***
 *
 * @file app/persona
 * @description Build Persona page for Blinx.ai.
 * @author Satyam Mahajan
 * @organization KreativX
 * @since 21 Sep 2024
 *
 */



import dynamic from 'next/dynamic';
import './style.scss'

const PersonaTabs = dynamic(()=>import("@/components/PersonaTabs"))

const Persona = () => {
    return(
        <div className="personaPage">
            <PersonaTabs />
        </div>
    )
}


export default Persona;
