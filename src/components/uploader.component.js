import {useState} from "react";
import './uploader.styles.css';
import ImageIcon from "./icons/image";

const UPLOAD_STATE = {
    WAITING: 0,
    UPLOADING: 1,
    UPLOADED: 2
};

const Uploader = () => {
    const [uploadState, setUploadState] = useState(UPLOAD_STATE.WAITING);
    const [uploadInfo, setUploadInfo] = useState({});

    if(uploadState === UPLOAD_STATE.UPLOADING) return (
        <div className="uploadingContainer">Loading...</div>
    )

    if(uploadState === UPLOAD_STATE.UPLOADED) return (
        <div className="uploadedContainer">
            <h1>Uploaded Successfully!</h1>
            <img className="image" src={`http://localhost:3000${uploadInfo.path}`} alt="user img"/>
            <div className="linkArea">
                <p>http://localhost:3000{uploadInfo.path}</p>
                <button onClick={handleCopy}>Copy Link</button>
            </div>
        </div>
    )

    return (
        <div className="uploader">
            <h1>Upload your image</h1>
            <p>File should be Jpeg, Png,...</p>
            <div className="droppable">
                <ImageIcon/>
                <p className="indicator">Drag & Drop your image here</p>
            </div>
            <p>Or</p>
            <label htmlFor="file-upload" className="btn">
                Upload File
            </label>
            <input id="file-upload" type="file" accept=".jpeg,.png" onChange={handleChange}/>
        </div>
    )

   async function handleChange(event) {
        setUploadState(UPLOAD_STATE.UPLOADING);

        fetch(`http://localhost:4000/upload`, {
            method: 'POST',
            body: await event.target.files[0].arrayBuffer(),
            headers: {
                "Content-type": "application/octet-stream"
            }
        })
            .then((response) => response.json())
            .then(data => setUploadInfo(data))
            .finally(() => setUploadState(UPLOAD_STATE.UPLOADED));
    }

    function handleCopy() {
        navigator.clipboard.writeText(`http://localhost:3000${uploadInfo.path}`).then(() => alert('Copied URL to the clipboard'));
    }
}

export default Uploader;