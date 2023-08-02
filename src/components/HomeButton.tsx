import { useNavigate } from "react-router-dom";

export function HomeButton() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/")}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <g fill="#374151">
          <path d="M220-180h150v-250h220v250h150v-390L480-765 220-570v390Zm-60 60v-480l320-240 320 240v480H530v-250H430v250H160Zm320-353Z" />
        </g>
      </svg>
    </button>
  );
}
