import React from 'react'
import "./CamelsCounter.css"

export default function CamelsCounter(props) {
    
    const authToken = localStorage.getItem("token");
    React.useEffect(() => {
        fetch("https://camex-backend.onrender.com/feed/getCamels", {
            headers: {
                "Authorization": "Bearer " + authToken,
              },
        })
        .then(res => {
            return res.json()
        }).then(
            resData => {
                console.log(resData)
                props.setCamels(resData.camels)
            }
        )
    },[])

    return <div className='camels'>
        Camels : {props.camels}
    </div>
}