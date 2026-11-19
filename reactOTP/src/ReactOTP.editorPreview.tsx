import { ReactElement, createElement, Fragment } from "react";
import classNames from "classnames";

import { ReactOTPPreviewProps } from "../typings/ReactOTPProps";
import { constantInteger, constantString } from "./utils/constants";

const PREVIEW_INPUTS = 4;
const MAX_INPUTS = 20;

// Design mode shows the configured number of boxes and separator when they are constants (for example 6 and '•');
// expressions that use attributes are only known at run time, so 4 boxes and - are shown for those.
export function preview(props: ReactOTPPreviewProps): ReactElement {
    const inputClass = props.InputStyleKey?.trim();
    const containerClass = props.ContainerStyleKey?.trim();
    const n = constantInteger(props.numInputs);
    const count = n !== undefined && n >= 1 && n <= MAX_INPUTS ? n : PREVIEW_INPUTS;
    const separator = constantString(props.separator) || "-";
    const placeholder = constantString(props.placeholder);

    return (
        <div className={classNames("widget-reactotp", props.class)} style={props.styleObject}>
            <div className={classNames("widget-reactotp-inputs", containerClass || "widget-reactotp-inputs-default")}>
                {Array.from({ length: count }, (_, index) => (
                    <Fragment key={index}>
                        <input
                            className={classNames(
                                "widget-reactotp-input",
                                inputClass || "widget-reactotp-input-default"
                            )}
                            placeholder={
                                placeholder
                                    ? placeholder.length === 1
                                        ? placeholder
                                        : placeholder.charAt(index) || undefined
                                    : undefined
                            }
                            readOnly
                            value=""
                        />
                        {index < count - 1 ? <span className="widget-reactotp-separator">{separator}</span> : null}
                    </Fragment>
                ))}
            </div>
        </div>
    );
}

export function getPreviewCss(): string {
    return require("./ui/ReactOTP.css");
}
