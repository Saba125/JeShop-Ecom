export default function checkDevice(userAgent: string) {
  const mobileKeywords = ["mobile", "android", "iphone", "ipad", "windows phone", "blackberry", "iemobile"];
  const agent = userAgent.toLowerCase();
  return mobileKeywords.some((keyword) => agent.includes(keyword));
}
