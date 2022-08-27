import { useEffect } from "react";
import cross from '../../assets/cross.png';

const ErrorModal = (props) => {
    const { id, showModal, errorMessage, setShowError } = props;

    useEffect(() => {
        if (showModal) document.getElementById("errorBtn").click()
        else document.getElementById("closeErrorBtn").click()
        return () => document.getElementById("closeErrorBtn").click()
    }, [showModal]);

    const onClose = () => setShowError(false);

    return (
        <>
            <button className="btn" data-bs-toggle="modal" data-bs-target={`#${id}`} style={{ display: "none" }} id="errorBtn"></button>
            <div className="modal fade show" id={id} aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body text-center" style={{ backgroundColor: "#2b2b2b" }}>
                            <button id="closeErrorBtn" type="button" className="btn btn-link" data-bs-dismiss="modal" style={{ display: "none" }}></button>
                            <img src={cross} alt="cross" width={100} />
                            <br />
                            <h3 className="m-2">{errorMessage}</h3>
                            <button className="btn btn-outline-danger m-2" onClick={onClose}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ErrorModal;