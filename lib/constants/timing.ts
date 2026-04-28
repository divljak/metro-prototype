/**
 * Mock timing constants for the prototype.
 *
 * These are intentional UX decisions — durations chosen to feel realistic
 * without slowing demos down. Salvaged from the original v0 build prompt;
 * the screen specs in /specs reference these names.
 *
 * Existing screen code currently hardcodes some of these values. When
 * touching a screen, prefer importing from here so timings stay consistent.
 */

export const MAGIC_LINK_SEND_MS = 1500;
export const MAGIC_LINK_REDIRECT_MS = 2000;
export const PASSPHRASE_VERIFY_MS = 800;
export const KYC_VERIFY_MS = 1500;

export const BACKGROUND_CHECK_STEPS_MS = [1200, 1000, 1300, 1100, 1400] as const;

export const AUTO_SAVE_VISIBLE_MS = 1000;
export const AUTO_SAVE_FADE_MS = 300;

export const CHECKPOINT_EXPIRY_DAYS = 7;
