import React from "react";

const Like = ({ bought }) => {
  let src = "checkbox-checked";
  src += bought === true ? ".jpg" : "-o.jpg";
  return (
    <div>
      <img src={src} style={{ width: 15 }} alt="" />
      {bought}
    </div>
  );
};
/*{" "}
classes += props.liked === true ? "" : "-o";
      <i
        onClick={() => props.onLike()}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      ></i>{" "}
      */
export default Like;
