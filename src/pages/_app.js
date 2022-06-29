import '../../styles/globals.css'
import AuthenticationContext from '../contexts/AuthenticationContext'

function MyApp({ Component, pageProps }) {
    return (
        <AuthenticationContext>
            <Component {...pageProps} />
        </AuthenticationContext>
    )
}

export default MyApp
