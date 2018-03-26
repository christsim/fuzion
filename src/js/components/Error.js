import React from "react";

export const Error = (props) => {
  return (props.error ? (<div>{props.error.toString()}</div>) : null)
}