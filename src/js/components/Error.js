import React from "react";

export const Error = (props) => {
  return (props.error ? (<div class="alert-danger" role="alert">{props.error.toString()}</div>) : null)
}