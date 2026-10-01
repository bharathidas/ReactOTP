import { ReactElement, createElement, Fragment } from "react";
import classNames from "classnames";

import { ReactOTPPreviewProps } from "../typings/ReactOTPProps";

const PREVIEW_INPUTS = 4;

// Design mode shows four empty boxes; the number of boxes comes from an attribute, which is only known at run time.
export function preview(props: ReactOTPPreviewProps): ReactElement {
    const inputClass = props.InputStyleKey?.trim();
    const containerClass = props.ContainerStyleKey?.trim();

    return (
        <div className={classNames("widget-reactotp", props.class)} style={props.styleObject}>
            <div className={classNames("widget-reactotp-inputs", containerClass || "widget-reactotp-inputs-default")}>
                {Array.from({ length: PREVIEW_INPUTS }, (_, index) => (
                    <Fragment key={index}>
                        <input
                            className={classNames(
                                "widget-reactotp-input",
                                inputClass || "widget-reactotp-input-default"
                            )}
                            readOnly
                            value=""
                        />
                        {index < PREVIEW_INPUTS - 1 ? <span className="widget-reactotp-separator">-</span> : null}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactOTP.css");
}
