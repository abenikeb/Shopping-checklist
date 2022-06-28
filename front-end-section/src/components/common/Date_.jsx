import React from "react";

const Date_ = ({ date }) => {
  var date = new Date(date);
  return (
    <div>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}
          ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}s
          `}</div>
  );
};

export default Date_;
