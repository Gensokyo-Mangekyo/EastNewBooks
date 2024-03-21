import "./Search.css"

export default function Search(props) {
        return(
            <div className="thaps-search-box">
                <div className="thaps-from-wrap">
        <input onChange={props.Change} maxLength={100} className="thaps-search" placeholder="Поиск"/>
        <button className="SearchButton" onClick={props.Click}>🔎</button>
            </div>
            </div>
        )
}