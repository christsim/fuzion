import React from "react";

export const Loading = (props) => {
  return (props.loading ? (<div class="loader">Loading...</div>): null);
}
