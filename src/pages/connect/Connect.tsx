import {NavigateFunction, useNavigate} from "react-router-dom";

const Connect = () => {
    const navigate: NavigateFunction = useNavigate();

    return (
        <div className="Connect">
            HI im APP
            <button onClick={() => navigate('/play')} className="start">
                <code>START</code>
            </button>
        </div>
    );
}

export default Connect;
