export default function UploadButton({ onClick }) {
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
          d="M11 7.83L8.41 10.41L7 9L12 4L17 9L15.59 10.42L13 7.83V16H11V7.83ZM6 15H4V18C4 19.1 4.9 20 6 20H18C19.1 20 20 19.1 20 18V15H18V18H6V15Z"
        />
      </svg>
      <span className="text-sm">Upload</span>
    </button>
  );
}
