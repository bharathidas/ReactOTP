# React OTP – Marketplace Documentation

Widget version 2.0.0 · Mendix Studio Pro 10.24.17 · Web

## Industry

All industries (cross-industry).

## Categories

- Widgets
- User Interface / Input

## Component tagline

One box per character for OTP, verification and PIN codes, with paste and SMS autofill.

## About

React OTP is an input for one-time passwords, verification codes and PIN codes, with one box per character. The cursor moves to the next box while typing and back with Backspace, and a pasted or SMS-autofilled code is spread over the boxes.

The code is stored in a String attribute. Number of boxes, input type, separator, placeholder and auto focus are expressions: a constant (`6`), an attribute (`$currentObject/CodeLength`) or a condition (`if $currentObject/UsePin then 4 else 6`).

Source code: https://github.com/bharathidas/ReactOTP

## Typical usage scenario

- Two-factor login with a code sent by SMS or email.
- Verifying a phone number or email address.
- PIN entry, for example to confirm a payment.
- Voucher and invitation codes.

## Features and limitations

**Features**

- 1–20 boxes; input types text, number, tel and password.
- Every setting except Value is an expression.
- Paste and SMS one-time-code autofill.
- Separator and placeholder.
- On change and On complete actions, for example to verify the code.
- Auto focus on the first box.
- Studio Pro design-mode preview and warnings for wrong constant values.
- Read-only support, validation messages, custom CSS classes, offline capable.

**Limitations**

- Web only.
- Value must be a String attribute.
- Design mode shows 4 boxes when Number of inputs uses an attribute or a condition.
- The separator cannot be empty; hide it with CSS.

## Dependencies

Mendix Studio Pro 10.24.17 or a later 10.24 version. No other modules are needed.

## Installation

1. Copy `mendix.ReactOTP.mpk` into the `widgets` folder of your app.
2. In Studio Pro, press F4 (Synchronize App Directory).
3. The widget appears in the Toolbox as **React OTP**.

**Upgrading from 1.x:** this is a breaking change. After F4, right-click the error and choose **Update all widgets**, then enter Number of inputs, Input type, Separator, Placeholder and Auto focus again as expressions. Value, CSS classes and events are kept.

## Configuration

1. Place a data view with an object that has a String attribute for the code.
2. Drag **React OTP** into it and select the **Value** attribute.
3. In the **Boxes** group, set the expressions (defaults `4`, `'text'`, `'-'`).
4. Optionally set **Auto focus** to `true` and an **On complete** action.

Examples:

- SMS code: `6`, `'number'`.
- PIN: `4`, `'password'`.
- Format per user: `$currentObject/CodeLength`.

## Known bugs

None known in 2.0.0.

## FAQ

**Can I still use attributes?**
Yes, as an expression such as `$currentObject/CodeLength`.

**Why are my settings empty after upgrading?**
They changed from attributes to expressions with new names. Enter them again.

**How do I verify the code automatically?**
Select a microflow or nanoflow as On complete action.

**How do I remove the separator?**
Add `.widget-reactotp-separator { display: none; }` to your theme.
