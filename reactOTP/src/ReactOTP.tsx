import { ReactElement, createElement, useCallback, useEffect, useRef } from "react";
import { ActionValue } from "mendix";
import { Big } from "big.js";
import classNames from "classnames";
import OTPInput, { AllowedInputTypes } from "react-otp-input";

import { ReactOTPContainerProps } from "../typings/ReactOTPProps";
import "./ui/ReactOTP.css";

const DEFAULT_INPUTS = 4;
const MAX_INPUTS = 20;
const INPUT_TYPES: AllowedInputTypes[] = ["text", "number", "tel", "password"];

// An empty Integer (expression or attribute) arrives as undefined or 0, so 0 and anything out of range mean
// "use the default".
export function toNumInputs(value: Big | number | undefined): number {
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
    // Expressions are undefined while they are being evaluated; the defaults are used until then.
    const numInputs = toNumInputs(props.numInputs?.value);
    const inputType = toInputType(props.inputType?.value);
    const separator = props.separator?.value || "-";
    const placeholder = props.placeholder?.value;
    const autoFocus = props.autoFocus?.value === true;
    const inputClass = props.InputStyleKey?.value?.trim();
    const containerClass = props.ContainerStyleKey?.value?.trim();
    const readOnly = valueKey.readOnly;
    const value = valueKey.value ?? "";
    const rootRef = useRef<HTMLDivElement>(null);
    const focusedRef = useRef(false);

    // Auto focus once, when the expression becomes true. Mendix renders a page before attaching it, which drops the
    // focus, and then focuses the first input of the page; so focus is retried on each frame until it stays on the
    // first box for a few frames (at most about a second), and stops as soon as the user clicks or types.
    useEffect(() => {
        if (!autoFocus || readOnly || focusedRef.current) {
            return;
        }
        focusedRef.current = true;
        let frame = 0;
        let held = 0;
        let handle = 0;
        let done = false;
        const detach = (): void => {
            cancelAnimationFrame(handle);
            document.removeEventListener("pointerdown", stop, true);
            document.removeEventListener("keydown", stop, true);
        };
        const stop = (): void => {
            done = true;
            detach();
        };
        const tick = (): void => {
            const first = rootRef.current?.querySelector<HTMLInputElement>(".widget-reactotp-input");
            if (first && first.isConnected && first.getClientRects().length > 0) {
                if (document.activeElement === first) {
                    held++;
                } else {
                    held = 0;
                    first.focus();
                }
            }
            if (held < 3 && ++frame < 60) {
                handle = requestAnimationFrame(tick);
            } else {
                stop();
            }
        };
        document.addEventListener("pointerdown", stop, true);
        document.addEventListener("keydown", stop, true);
        tick();
        return () => {
            detach();
            // Interrupted by a re-render (for example the value finished loading): allow the next run to try again.
            if (!done) {
                focusedRef.current = false;
            }
        };
    }, [autoFocus, readOnly]);

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
            ref={rootRef}
            className={classNames("widget-reactotp", { "widget-reactotp-readonly": readOnly }, props.class)}
            style={props.style}
        >
            <OTPInput
                value={value}
                onChange={onChange}
                numInputs={numInputs}
                inputType={inputType}
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
