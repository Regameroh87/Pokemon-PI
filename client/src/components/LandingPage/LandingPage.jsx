import { Link } from 'react-router-dom'
import Styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={Styles.LandingPage}>
        <Link to="/home">
        <button className={Styles.button}>HOME</button>
        </Link>
        </div>
    )
} 

//https://gifdb.com/images/high/pokemon-logo-pokeball-43fizbrwwciwagvn.webp
//https://w0.peakpx.com/wallpaper/370/406/HD-wallpaper-pokemon-aesthetic-cute-kawaii.jpg
// picachu corriendo
// https://www.google.com/imgres?imgurl=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F5e%2F4a%2F8f%2F5e4a8f3747faaa61cffe65e66c18c318.gif&tbnid=iTKyRLp7kogShM&vet=10CAgQxiAoB2oYChMIgN_6gvaFgQMVAAAAAB0AAAAAEJQC..i&imgrefurl=https%3A%2F%2Far.pinterest.com%2Fpin%2F492651646736798837%2F%3Famp_client_id%3DCLIENT_ID(_)%26mweb_unauth_id%3D%26from_amp_pin_page%3Dtrue&docid=cL-sakvffArqAM&w=800&h=600&itg=1&q=cute%20pokemon%20%204k%20gif&hl=es-419&ved=0CAgQxiAoB2oYChMIgN_6gvaFgQMVAAAAAB0AAAAAEJQC