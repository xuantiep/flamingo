import * as React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";

/**
 * Heart.
 */
export default function Heart(props) {
  return (
    <span
      css={css`
        &:hover {
          color: red;
          cursor: default;
        }
      `}
    >
      ♥
    </span>
  );
}
