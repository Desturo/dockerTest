import { useCallback, useState } from 'react';
import axios from 'axios'

const MainComponent = () => {
    const [values, setValues] = useState([])

    const getAllNumbers = useCallback(async() => {
        const values = await axios.get('/api/values/all')
    })

    return (
        <div>
            <button onClick={getAllNumbers}>Get all numbers</button>
        </div>
    )
}

export default MainComponent;