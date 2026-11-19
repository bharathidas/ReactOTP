# Changelog

## 2.0.0 (2026-11-18)

### Breaking: settings are expressions instead of attributes
- **Number of inputs** (Integer), **Input type**, **Separator**, **Placeholder** (String) and **Auto focus** (Boolean)
  are now expressions. Use a constant (`6`, `'password'`, `'-'`, `true`), an attribute (`$currentObject/CodeLength`)
  or logic (`if $currentObject/IsPin then 4 else 6`).
- The property keys changed (`numInputsKey` → `numInputs`, `inputTypeKey` → `inputType`,
  `renderSeparatorKey` → `separator`, `placeholderKey` → `placeholder`, `autoFocusKey` → `autoFocus`), so after
  updating from 1.x these five settings are empty on existing widgets. Re-enter them: for an attribute you used before,
  enter `$currentObject/<Attribute>`; for Auto focus, enter `true` if it was ticked. Until then the widget uses its
  defaults (4 text boxes, `-`, no placeholder, no auto focus).
- **Value** stays a String attribute (the widget writes the code to it).
- New widgets start with Number of inputs `4`, Input type `'text'`, Separator `'-'` and Auto focus `false`.

### Other changes
- Studio Pro design mode shows the configured number of boxes, separator and placeholder when they are constants.
- Studio Pro warns when a constant Number of inputs is outside 1–20 or a constant Input type is not
  `'text'`, `'number'`, `'tel'` or `'password'`.
- Auto focus now works when other inputs come before the widget on the page. Before, the Mendix client moved the
  focus to the first input of the page right after the widget had focused its first box.
- The settings are in a new **Boxes** group; **Data source** holds only Value.

## 1.1.0 (2026-10-01)
- Converted to Mendix Studio Pro 10.24.17; see the GitHub release Version1.1.0.
