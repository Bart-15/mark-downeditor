import ReactMarkdown from 'react-markdown';
type TPreview = {
    value:string;
}

const Preview = ({value}: TPreview) => {
    return ( 
        <div className="preview__container">
            <h2 className="title">Preview</h2>
            <div className="preview-scroll">
                <ReactMarkdown>{value}</ReactMarkdown>
            </div>
        </div>
    );
}
 
export default Preview;