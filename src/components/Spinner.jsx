import { css } from '@emotion/react'
import { ClipLoader } from 'react-spinners'

const override = css`
  display: flex;
  justify-content: center;
  align-items: center;
`

function Spinner() {
  return (
    <div className='flex items-center justify-center h-8 font-bold'>
      <div className='inline-flex items-center justify-center space-x-2 text-white'>
        <ClipLoader color={'#f8f8f8'} loading={true} css={override} size={40} />
        <p>Loading...</p>
      </div>
    </div>
  )
}
export default Spinner
