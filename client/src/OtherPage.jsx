import { Link } from 'react-router-dom'

const OtherPage = () => {
    return(
        <div>
            I am another page!
            <br />
            <Link to='/'>Go back to home screen.</Link>
        </div>
    )
}

export default OtherPage