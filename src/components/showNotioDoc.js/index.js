const ShowNotioDoc = (props) => {
    const { btnText, link, id } = props;
    return (
        <>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${id}`}>{btnText}</button>
            <div className="modal fade" id={id} tabindex="-1" aria-hidden="true">
                <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                    <div className="modal-content">
                        <div className="modal-body">
                            <iframe src={link} title="description"></iframe>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ShowNotioDoc;