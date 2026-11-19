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
    numInputs?: DynamicValue<Big>;
    inputType?: DynamicValue<string>;
    separator?: DynamicValue<string>;
    placeholder?: DynamicValue<string>;
    InputStyleKey?: DynamicValue<string>;
    ContainerStyleKey?: DynamicValue<string>;
    autoFocus?: DynamicValue<boolean>;
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
    numInputs: string;
    inputType: string;
    separator: string;
    placeholder: string;
    InputStyleKey: string;
    ContainerStyleKey: string;
    autoFocus: string;
    onChangeAction: {} | null;
    onCompleteAction: {} | null;
}
