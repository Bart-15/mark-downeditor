import {useRef, useState, useEffect} from 'react';
import { TValue, TModal } from '../types/markdown.types';

const DownloadModal = ({setOpen, title, setTitle, markdown}: TModal) => {
    const handleClose = () => {
        setTitle("");
        setOpen(false);
    }
    const handleSave = () => {

        if(!title) return alert("Please complete all fields");
        
        const link = document.createElement('a');
        const file = new Blob([markdown], { type: 'text/plain' });
        link.href = URL.createObjectURL(file);
        link.download = `${title}.md`;
        link.click();
        URL.revokeObjectURL(link.href)

        handleClose();
    }
    return (
        <div className="modal">
            <div className="modal-content">
                <p className="close" onClick={handleClose}>&times;</p>
                <div>
                    <label>File name:</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    <button className="save" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    )
}


const Editor = ({value, setValue} : TValue) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isOpen, setOpen] = useState<boolean>(false);
    const [title, setTitle] = useState<string>("");

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        
        const file = e.target.files?.[0];

        const ext = e.target.files?.[0].name.split('.').pop();
        if(!file || ext !== 'md') {
            return alert("Markdown File only");
        }

        const reader = new FileReader();
        reader.onload = (e:any) => {
            setValue(e.target.result);
        };
    
        reader.readAsText(file);
        
    }
    

    const reset = () => {
        inputRef.current!.value = "";
        setValue(inputRef.current!.value);
    };

    return ( 
        <>
            <div className="editor__container">
                <h2 className="title">Editor</h2>
                <div className="import">
                    <label>Import file :</label>
                    <input type="file" ref={inputRef} className="file" onChange={handleFile}/>
                </div>
                <textarea className="editor-input" value={value} onChange={(e) => setValue(e.target.value)}/>
                {
                    value && 
                    (
                    <div className="btn-actions">
                        <button className="download-button" onClick={() => setOpen(true)}>Download</button>
                        <button className="clear-button" onClick={reset}>&times; CLEAR</button>
                    </div>
                    )
                }
            </div>
            { isOpen && <DownloadModal setOpen={setOpen} title={title} setTitle={setTitle} markdown={value} />}
            
        </>
    );
}

export default Editor;