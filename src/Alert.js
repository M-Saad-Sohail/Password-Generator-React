import React from 'react'

const Alert = (props) => {
    return (
        <div className={props.visibility ? "visible" : "hidden"}>
            <div className="p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-300">
                <span className="font-medium">{props.messege}</span>
            </div>
        </div>
    )
}

export default Alert
