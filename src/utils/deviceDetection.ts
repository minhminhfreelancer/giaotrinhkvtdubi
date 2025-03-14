/**
 * Utility functions for device detection
 */

/**
 * Checks if the current device is a mobile device
 * @returns {boolean} True if the device is mobile, false otherwise
 */
export function isMobileDevice(): boolean {
  // Check if window is defined (for SSR compatibility)
  if (typeof window === "undefined") return false;

  // Check for touch support as primary indicator
  const hasTouchSupport =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

  // Check user agent for mobile devices
  const userAgent = navigator.userAgent.toLowerCase();
  const isMobileUserAgent =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile|tablet/i.test(
      userAgent,
    );

  // Check screen size (typical mobile width threshold)
  const hasSmallScreen = window.innerWidth <= 768;

  // Consider a device mobile if it has touch support AND either has a mobile user agent OR a small screen
  return hasTouchSupport && (isMobileUserAgent || hasSmallScreen);
}

/**
 * Checks if the current device is specifically a tablet
 * @returns {boolean} True if the device is a tablet, false otherwise
 */
export function isTabletDevice(): boolean {
  if (typeof window === "undefined") return false;

  const userAgent = navigator.userAgent.toLowerCase();
  const isTabletUserAgent = /ipad|android(?!.*mobile)/i.test(userAgent);

  // Tablets typically have larger screens than phones but smaller than desktops
  const hasTabletScreen = window.innerWidth > 640 && window.innerWidth <= 1024;

  return isTabletUserAgent || (isMobileDevice() && hasTabletScreen);
}

/**
 * Redirects to mobile version if on a mobile device
 * @param {string} mobileUrl - The URL to redirect to for mobile devices
 * @param {boolean} forceRedirect - Whether to force redirect regardless of current URL
 */
export function redirectToMobileVersionIfNeeded(
  mobileUrl: string = "/mobile",
  forceRedirect: boolean = false,
): void {
  // Skip if we're already on the mobile URL path
  if (!forceRedirect && window.location.pathname.startsWith(mobileUrl)) return;

  // Only redirect if we're on a mobile device
  if (isMobileDevice() && !isTabletDevice()) {
    window.location.href = mobileUrl;
  }
}

/**
 * Redirects to desktop version if on a desktop device
 * @param {string} desktopUrl - The URL to redirect to for desktop devices
 * @param {boolean} forceRedirect - Whether to force redirect regardless of current URL
 */
export function redirectToDesktopVersionIfNeeded(
  desktopUrl: string = "/",
  forceRedirect: boolean = false,
): void {
  // Skip if we're already on a non-mobile URL path
  if (!forceRedirect && !window.location.pathname.startsWith("/mobile")) return;

  // Only redirect if we're not on a mobile device
  if (!isMobileDevice()) {
    window.location.href = desktopUrl;
  }
}
