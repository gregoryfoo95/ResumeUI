// Lets any button open the command palette without prop drilling.
export const OPEN_PALETTE_EVENT = "open-command-palette";
export const openCommandPalette = () => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
