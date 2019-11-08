import React from 'react';
import 'tachyons';
import './ImageLinkForm.css'

const ImageLinkForm = (props) => {
    console.log(props)
    return(
        <nav className="ImageLinkForm">
            <p className="f3">
                {'This Magic Brain will detect faces in your pictures!'}
            </p>
            <div className="center">
                <div className="form pa4 br3 shadow-5 center">
                    <input className="f4 pa2 w-70 center" type="text" onChange={props.onInputChange}/>
                    <button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={props.onSubmit}>Detect</button>
                </div>
            </div>
        </nav>
    )
}

export default ImageLinkForm