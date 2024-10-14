import "./loading.css"

function Loading() {
    return (
        <div className=" w-full h-full flex flex-col items-center justify-center">
            <div className="loading">
                <div className="d1"></div>
                <div className="d2"></div>
            </div>
        </div>
    );
}

export default Loading;