import { ReactElement, createElement, useCallback } from "react";
import { ActionValue } from "mendix";
import { Big } from "big.js";
import classNames from "classnames";
import OTPInput, { AllowedInputTypes } from "react-otp-input";

import { ReactOTPContainerProps } from "../typings/ReactOTPProps";
import "./ui/ReactOTP.css";

const DEFAULT_INPUTS = 4;
const MAX_INPUTS = 20;
const INPUT_TYPES: AllowedInputTypes[] = ["text", "number", "tel", "password"];

// An empty Integer attribute arrives as 0, so 0 (and anything out of range) means "use the default".
export function toNumInputs(value: Big | undefined): number {
    const n = value === undefined || value === null ? NaN : Math.floor(Number(value));
    return n >= 1 && n <= MAX_INPUTS ? n : DEFAULT_INPUTS;
}

export function toInputType(value: string | undefined): AllowedInputTypes {
    const type = (value ?? "").trim().toLowerCase() as AllowedInputTypes;
    return INPUT_TYPES.includes(type) ? type : "text";
}

// One character is shown in every box; a longer text gives one character per box.
export function placeholderAt(value: string | undefined, index: number): string | undefined {
    if (!value) {
        return undefined;
    }
    return value.length === 1 ? value : value.charAt(index) || undefined;
}

function run(action: ActionValue | undefined): void {
    if (action?.canExecute && !action.isExecuting) {
        action.execute();
    }
}

export function ReactOTP(props: ReactOTPContainerProps): ReactElement {
    const { valueKey, onChangeAction, onCompleteAction } = props;
    const numInputs = toNumInputs(props.numInputsKey?.value);
    const inputType = toInputType(props.inputTypeKey?.value);
    const separator = props.renderSeparatorKey?.value || "-";
    const placeholder = props.placeholderKey?.value;
    const inputClass = props.InputStyleKey?.value?.trim();
    const containerClass = props.ContainerStyleKey?.value?.trim();
    const readOnly = valueKey.readOnly;
    const value = valueKey.value ?? "";

    const onChange = useCallback(
        (otp: string) => {
            if (valueKey.readOnly || otp === (valueKey.value ?? "")) {
                return;
            }
            valueKey.setValue(otp);
            run(onChangeAction);
            if (otp.length === numInputs) {
                run(onCompleteAction);
            }
        },
        [valueKey, onChangeAction, onCompleteAction, numInputs]
    );

    return (
        <div
            className={classNames("widget-reactotp", { "widget-reactotp-readonly": readOnly }, props.class)}
            style={props.style}
        >
            <OTPInput
                value={value}
                onChange={onChange}
                numInputs={numInputs}
                inputType={inputType}
                shouldAutoFocus={props.autoFocusKey && !readOnly}
                skipDefaultStyles
                containerStyle={classNames(
                    "widget-reactotp-inputs",
                    containerClass || "widget-reactotp-inputs-default"
                )}
                renderSeparator={<span className="widget-reactotp-separator">{separator}</span>}
                renderInput={(inputProps, index) => (
                    <input
                        {...inputProps}
                        className={classNames("widget-reactotp-input", inputClass || "widget-reactotp-input-default")}
                        placeholder={placeholderAt(placeholder, index)}
                        // Lets phones offer the code from an SMS; the library spreads a pasted full code over the boxes.
                        autoComplete={index === 0 ? "one-time-code" : "off"}
                        disabled={readOnly}
                        tabIndex={props.tabIndex}
                    />
                )}
            />
            {valueKey.validation ? (
                <div className="alert alert-danger mx-validation-message">{valueKey.validation}</div>
            ) : null}
        </div>
    );
}
