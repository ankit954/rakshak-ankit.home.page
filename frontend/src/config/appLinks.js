export const PLAY_STORE_URL = process.env.REACT_APP_PLAY_STORE_URL;
export const APP_STORE_URL = process.env.REACT_APP_APP_STORE_URL;

if (!PLAY_STORE_URL) {
  throw new Error("REACT_APP_PLAY_STORE_URL must be configured.");
}