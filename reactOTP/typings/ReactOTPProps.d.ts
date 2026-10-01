/**
 * This file was generated from ReactOTP.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, DynamicValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface ReactOTPContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    valueKey: EditableValue<string>;
    numInputsKey?: EditableValue<Big>;
    inputTypeKey?: EditableValue<string>;
    renderSeparatorKey?: EditableValue<string>;
    placeholderKey?: EditableValue<string>;
    InputStyleKey?: DynamicValue<string>;
    ContainerStyleKey?: DynamicValue<string>;
    autoFocusKey: boolean;
    onChangeAction?: ActionValue;
    onCompleteAction?: ActionValue;
}

export interface ReactOTPPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    valueKey: string;
    numInputsKey: string;
    inputTypeKey: string;
    renderSeparatorKey: string;
    placeholderKey: string;
    InputStyleKey: string;
    ContainerStyleKey: string;
    autoFocusKey: boolean;
    onChangeAction: {} | null;
    onCompleteAction: {} | null;
}
