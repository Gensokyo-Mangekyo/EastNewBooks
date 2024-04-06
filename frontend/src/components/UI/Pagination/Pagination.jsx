import "./Pagination.css"

export default function Pagination({children, ...props}) {


    return (
        <div class="pagination">
  <button class="arrow" onClick={props.prev} >←</button>
  <input class="page-number" value={children} />
  <button class="arrow" onClick={props.next}>→</button>
        </div>
    )
}