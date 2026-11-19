# React OTP – Marketplace Documentation

Widget version 2.0.0 · Mendix Studio Pro 10.24.17 · Web

## Industry

All industries (cross-industry).

## Categories

- Widgets
- User Interface / Input

## Component tagline

One box per character for OTP, verification and PIN codes, with paste and SMS autofill.

(87 characters)

## About

React OTP is an input for one-time passwords (OTP), verification codes and PIN codes. It shows one box per character. The cursor moves to the next box while the user types and back with Backspace, and a code that is pasted or offered by the phone from an SMS is spread over the boxes. It is built on the react-otp-input library.

The code is stored in a String attribute. The number of boxes, the input type (text, number, tel or password), the separator, the placeholder and auto focus are expressions: a constant such as `6`, an attribute such as `$currentObject/CodeLength`, or a condition such as `if $currentObject/UsePin then 4 else 6`. The On change and On complete events can run an action, for example to verify the code as soon as every box is filled.

Version 2.0.0 turns these settings from attributes into expressions, so fixed settings no longer need helper attributes. Studio Pro shows the configured boxes in design mode and warns about wrong constant values. Auto focus also works when other inputs come before the widget. The package is about 13 KB.

The source code is on GitHub: https://github.com/bharathidas/ReactOTP

## Typical usage scenario

React OTP replaces a plain text box when users must type a short code. One box per character makes the length of the code clear, and typing, deleting and pasting work as users expect from banking and login apps.

- Two-factor authentication and login with a code sent by SMS or email.
- Verifying a phone number or email address during registration.
- PIN entry, for example to unlock a page or confirm a payment.
- Voucher, licence and invitation codes.
- One screen for several code formats, for example a 6-digit SMS code or a 4-digit PIN, chosen by an expression.

## Features and limitations

**Features**

- One box per character, 1–20 boxes (an Integer expression; default 4).
- Input types text, number, tel and password; number and tel accept only digits and show the number keyboard on phones.
- Every setting except Value is an expression: constants, attributes and conditions.
- Automatic focus to the next box while typing; Backspace, Delete and the arrow keys move between boxes.
- Paste a full code into the boxes; the first box supports SMS one-time-code autofill on phones.
- Separator between the boxes and a placeholder (one character for all boxes or one per box).
- On change and On complete actions, for example to verify the code when every box is filled.
- Auto focus on the first box, also when other inputs come first on the page.
- Studio Pro design mode shows the configured boxes; warnings for a wrong constant number of inputs or input type.
- Read-only support (Editability, data view or access rules) and validation messages.
- Default style that shrinks on phones, or your own Input class and Container class from the theme.
- Offline capable.

**Limitations**

- Web only; not available for native mobile.
- Value must be a String attribute (the widget writes the code to it).
- Design mode shows 4 boxes when Number of inputs uses an attribute or a condition (the value is known only at run time).
- The separator cannot be empty (empty shows -); hide it with CSS if you need no separator.
- When the user types in a box while earlier boxes are empty, the characters move to the front (the value is stored without gaps).

## Dependencies

- Mendix Studio Pro 10.24.17 or a later 10.24 version.
- No other modules or libraries are needed.

## Installation

1. Download `mendix.ReactOTP.mpk` from the Marketplace (or from the GitHub release Version2.0.0).
2. Copy it into the `widgets` folder of your app (App > Show App Directory in Explorer).
3. In Studio Pro, press F4 (App > Synchronize App Directory).
4. The widget appears in the Toolbox as **React OTP**.

**Upgrading from 1.x:** replace the file in the `widgets` folder and press F4. Studio Pro reports that the widget definition changed; right-click the error and choose **Update all widgets**. The property names changed, so Number of inputs, Input type, Separator, Placeholder and Auto focus are empty after the update: enter them again as expressions (`$currentObject/<Attribute>` for an attribute you used before, a constant such as `6` or `'number'`, and `true` for a ticked Auto focus). Until then the widget shows 4 text boxes with -. Value, Input class, Container class and the events are kept. If the running app still shows the old widget, choose App > Clean Deployment Directory and run the app again.

## Configuration

1. Create an entity (for example a non-persistent `CodeHelper`) with a String attribute for the code.
2. Put a data view with an object of that entity on the page.
3. Drag **React OTP** into the data view and select the **Value** attribute.
4. In the **Boxes** group, set **Number of inputs**, **Input type**, **Separator** and **Placeholder** as expressions. New widgets start with `4`, `'text'` and `'-'`.
5. Optionally set **Auto focus** to `true`, and select an **On complete** action on the **Events** tab, for example a nanoflow or microflow that verifies the code.

Recommended settings:

- 6-digit SMS or email code: Number of inputs `6`, Input type `'number'`, On complete runs the verify microflow.
- PIN: Number of inputs `4`, Input type `'password'`, Auto focus `true`.
- Authenticator app code: Number of inputs `6`, Input type `'tel'`, Placeholder `'0'`.
- Voucher with letters: Number of inputs `8`, Input type `'text'`, Separator `'•'`.
- Format stored per tenant or user: Number of inputs `$currentObject/CodeLength`, Input type `$currentObject/InputType`.
- SMS code or PIN on one screen: Number of inputs `if $currentObject/UsePin then 4 else 6`, Input type `if $currentObject/UsePin then 'password' else 'number'`.
- Show a code without editing: Editability Never.

Styling: the outer element has the class `widget-reactotp`, the row `widget-reactotp-inputs`, each box `widget-reactotp-input` and each separator `widget-reactotp-separator`. The default look uses `widget-reactotp-inputs-default` and `widget-reactotp-input-default`; an Input class or Container class replaces them.

## Known bugs

- None known in 2.0.0. Typing into a later box while earlier boxes are empty stores the characters without gaps (library behaviour).

## FAQ

**Can I still use attributes for the settings?**
Yes. Enter the attribute as an expression, for example `$currentObject/CodeLength`. The widget follows the attribute when it changes.

**My settings are empty after upgrading to 2.0.0.**
The settings changed from attributes to expressions and got new names, so Studio Pro cannot keep them. Enter them again, for example `$currentObject/NumInputs` or `6`.

**Why does Studio Pro show 4 boxes although I set 6?**
Design mode shows the configured number only for a constant such as `6`. With an attribute or a condition it shows 4; the app shows the real number.

**How do I verify the code automatically?**
Select a microflow or nanoflow as On complete action. It runs when every box is filled; the code is already in the Value attribute.

**How do I show only digits and the number keyboard?**
Set Input type to `'number'` or `'tel'`.

**How do I remove the - between the boxes?**
Add `.widget-reactotp-separator { display: none; }` to your theme, or set Separator to `' '`.

**Does it work in older Mendix versions?**
Versions 2.0.0 and 1.1.0 are built and tested for Studio Pro 10.24.17. Version 1.0.0 (GitHub release version1) was made for Mendix 9.12.4.
