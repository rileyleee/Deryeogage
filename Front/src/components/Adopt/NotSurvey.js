import { Link } from "react-router-dom";

function NotSurvey() {
    return (
        <div>
            <p><Link to="/survey">설문조사</Link>를 하면 나의 생활과 맞는 강아지를 추천해드려요!</p>
        </div>
    )
}

export default NotSurvey;
