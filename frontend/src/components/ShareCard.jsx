import { memo } from "react"


function ShareCard({handleClose, value}) {
  return (
    <div className='w-screen h-screen mx-auto bg-black/70  backdrop-blur-xl fixed top-0 left-0 pt-20 px-52'>
      <div className="bg-white w-full p-2 mx-auto flex justify-between">
        <p>{`https://brainly-0ui5.onrender.com/${value}`}</p>
        <button onClick={handleClose} className="cursor-pointer"><i className="fa-solid fa-xmark"></i></button>
      </div>
    </div>
  )
}
export default memo(ShareCard)