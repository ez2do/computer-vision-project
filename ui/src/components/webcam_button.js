export default function WebcamButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center cursor-pointer bg-blue-100 hover:bg-blue-300 rounded-sm p-1"
    >
      <svg
        className="sample-source-icon"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="#1967D2"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M18 6V10.48L22 6.5V17.5L18 13.52V14.52V18C18 19.1 17.1 20 16 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4H16C17.1 4 18 4.9 18 6ZM16 14.52V9.69V6H4V18H16V14.52Z"
        />
      </svg>
      <span className="text-sm">Webcam</span>
    </button>
  );
}
