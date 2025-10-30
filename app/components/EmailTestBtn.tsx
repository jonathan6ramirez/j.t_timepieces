type props = {
  clickFunc: () => void
}

export default function EmailTestButton({ clickFunc }: props) {
  return (
    <div className="">
      <button
        className="p-2 rounded roundeds-sm bg-blue-500 text-white transition-transform
            hover:scale-105 active:scale-90"
        onClick={() => clickFunc()}
      >
        <span>
          Test Email Send
        </span>
      </button>
    </div>
  )
}
