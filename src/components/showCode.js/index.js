import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ShowCode = (props) => {
    const { btnText, codeString, id } = props;
    return (
        <>
            <button className="btn btn-link mx-2 p-0 my-3" data-bs-toggle="modal" data-bs-target={`#${id}`}>{btnText}</button>
            <div className="modal fade" id={id} tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body p-0" style={{ backgroundColor: "#2b2b2b" }}>
                            <button type="button" class="btn btn-link" data-bs-dismiss="modal">Close</button>
                            <SyntaxHighlighter language="javascript" style={a11yDark}>
                                {codeString}
                            </SyntaxHighlighter>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowCode;