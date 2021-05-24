import React, {useState} from 'react'
import Dropzone from 'react-dropzone';
import axios from 'axios';

function FileUpload(props) {

    const [PImage, setImages] = useState([]);

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        };
        formData.append("file", files[0]);

        axios.post('/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {
                    setImages([...PImage, response.data.image]);
                    props.refreshFunction([...PImage, response.data.image]);
                } else {
                    alert('Saving to server failed');
                }
            });
    }


    return(
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                         {...getRootProps()}
                    >
                        <input {...getInputProps()} />


                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

                {PImage.map((image, index) => (
                    <div >
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>
        </div>
    )
}

export default FileUpload