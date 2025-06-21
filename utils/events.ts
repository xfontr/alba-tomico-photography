export const closeMenu = (): void => {
  document.dispatchEvent(new CustomEvent("close-menu"));
};
