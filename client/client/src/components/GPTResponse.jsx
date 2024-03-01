import React from 'react'

const GPTResponse = ({ response }) => {
     const res = response.data;

  return (
    <div class="response">
        {res}
    </div>
  )
}

export default GPTResponse