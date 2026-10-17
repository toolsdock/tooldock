# Tool network light-theme contrast fix

Replace `packages/network/src/styles.css` with this version.

The global tool switcher now owns its neutral dark palette instead of inheriting each app's light-theme `--text`, `--surface`, and `--muted` variables. This keeps the top strip readable in both light and dark themes across all five apps while preserving each app's accent color for the active tool and hover states.
