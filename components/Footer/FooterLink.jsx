import * as React from "react";
/** @jsxRuntime classic */
/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import * as MainSiteStyles from "../globals";

export default function FooterLink(props) {
  return (
    <a
      css={css`
        margin-right: 15px;
        text-decoration: none;
        color: inherit;

        ${MainSiteStyles.phone} {
          margin: auto;
        }
      `}
      href={props.url}
    >
      {props.text}
    </a>
  );
}
