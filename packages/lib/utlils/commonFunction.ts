export function getCookieValue(name: any) {
  const cookieArray = document.cookie.split("; ");
  const cookie = cookieArray.find((c) => c.startsWith(`${name}=`));
  return cookie ? cookie.split("=")[1] : "";
}

export function setNewCookie(cookieString: string) {
  document.cookie = cookieString;
}
