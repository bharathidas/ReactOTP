# React OTP – Marketplace Documentation

Widget version 1.1.0 · Mendix Studio Pro 10.24.17 · Web

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

The code is stored in a String attribute. The number of boxes, the input type (text, number, tel or password), the separator and the placeholder come from attributes, and the On change and On complete events can run an action, for example to verify the code as soon as every box is filled.

Version 1.1.0 is rebuilt for Mendix Studio Pro 10.24.17. Number of inputs, input type and separator are now optional, an empty number of inputs shows 4 boxes instead of none, read-only attributes disable the boxes, the boxes fit on phone screens, and the widget no longer writes debug messages to the browser console. The package is about 12 KB.

The source code is on GitHub: https://github.com/bharathidas/ReactOTP

## Typical usage scenario

React OTP replaces a plain text box when users must type a short code. One box per character makes the length of the code clear, and typing, deleting and pasting work as users expect from banking and login apps.

- Two-factor authentication and login with a code sent by SMS or email.
- Verifying a phone number or email address during registration.
- PIN entry, for example to unlock a page or confirm a payment.
- Voucher, licence and invitation codes.

## Features and limitations

**Features**

- One box per character, 1–20 boxes (from an Integer attribute; default 4).
- Input types text, number, tel and password; number and tel accept only digits and show the number keyboard on phones.
- Automatic focus to the next box while typing; Backspace, Delete and the arrow keys move between boxes.
- Paste a full code into the boxes; the first box supports SMS one-time-code autofill on phones.
- Separator between the boxes and a placeholder (one character for all boxes or one per box).
- On change and On complete actions, for example to verify the code when every box is filled.
- Auto focus on the first box.
- Read-only support (Editability, data view or access rules) and validation messages.
- Default style that shrinks on phones, or your own Input class and Container class from the theme.
- Offline capable.

**Limitations**

- Web only; not available for native mobile.
- Number of inputs, input type, separator and placeholder are attributes, not fixed values in the widget properties.
- The separator cannot be empty (empty shows -); hide it with CSS if you need no separator.
- When the user types in a box while earlier boxes are empty, the characters move to the front (the value is stored without gaps).

## Dependencies

- Mendix Studio Pro 10.24.17 or a later 10.24 version.
- No other modules or libraries are needed.

## Installation

1. Download `mendix.ReactOTP.mpk` from the Marketplace (or from the GitHub release Version1.1.0).
2. Copy it into the `widgets` folder of your app (App > Show App Directory in Explorer).
3. In Studio Pro, press F4 (App > Synchronize App Directory).
4. The widget appears in the Toolbox as **React OTP**.

**Upgrading from 1.0.0:** replace the file in the `widgets` folder and press F4. Studio Pro reports that the widget definition changed; right-click the error and choose **Update all widgets**. Your settings are kept. If the running app still shows the old widget, choose App > Clean Deployment Directory and run the app again. If you used Input class or Container class, your class now fully controls the boxes (1.0.0 also set an inline width of 1em), so give the boxes a width in your class.

## Configuration

1. Create an entity (for example a non-persistent `CodeHelper`) with a String attribute for the code.
2. Put a data view with an object of that entity on the page.
3. Drag **React OTP** into the data view and select the **Value** attribute.
4. Optionally select attributes for **Number of inputs** (Integer), **Input type**, **Separator** and **Placeholder** (String). Without them the widget shows 4 text boxes with - between them.
5. Optionally select an **On complete** action on the **Events** tab, for example a microflow that verifies the code.

Recommended settings:

- 6-digit SMS or email code: Number of inputs 6, input type number, On complete runs the verify microflow.
- PIN: Number of inputs 4, input type password, Auto focus Yes.
- Authenticator app code: Number of inputs 6, input type tel, placeholder 0.
- Voucher with letters: Number of inputs 8, input type text, separator •.
- Show a code without editing: Editability Never.

Styling: the outer element has the class `widget-reactotp`, the row `widget-reactotp-inputs`, each box `widget-reactotp-input` and each separator `widget-reactotp-separator`. The default look uses `widget-reactotp-inputs-default` and `widget-reactotp-input-default`; an Input class or Container class replaces them.

## Known bugs

- None known in 1.1.0. Typing into a later box while earlier boxes are empty stores the characters without gaps (library behaviour).

## FAQ

**Why does my widget show no boxes?**
That is version 1.0.0 with an empty Number of inputs attribute (Mendix passes it as 0). Upgrade to 1.1.0; it then shows 4 boxes. Values from 1 to 20 set the number of boxes.

**Do I still need attributes for the number of inputs, input type and separator?**
No. In 1.1.0 only Value is required. Without the others the widget shows 4 text boxes with - between them.

**How do I verify the code automatically?**
Select a microflow or nanoflow as On complete action. It runs when every box is filled; the code is already in the Value attribute.

**How do I show only digits and the number keyboard?**
Set the Input type attribute to number or tel.

**How do I remove the - between the boxes?**
Add `.widget-reactotp-separator { display: none; }` to your theme, or set the Separator attribute to a space.

**Does it work in older Mendix versions?**
Version 1.1.0 is built and tested for Studio Pro 10.24.17. Version 1.0.0 (GitHub release version1) was made for Mendix 9.12.4.
