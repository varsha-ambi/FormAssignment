import react from "react";
export default function Employee(props) {
  return (
    <>
      <div>
        <li>
          <button
            className="delete"
            onClick={() => {
              props.onSelect(props.id);
            }}
          >
            x
          </button>
          {props.text}
        </li>
      </div>
    </>
  );
}
