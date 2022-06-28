import React from 'react'

const Like = (props) => {
  let classes = 'fa fa-heart'
  classes += props.liked === true ? '' : '-o'
  return (
    <div>
      <i
        onClick={() => props.onLike()}
        style={{ cursor: 'pointer' }}
        className={classes}
        aria-hidden="true"
      ></i>
    </div>
  )
}

export default Like
