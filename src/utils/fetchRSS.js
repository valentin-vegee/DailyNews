export async function fetchRSS(url) {
    const response = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    return new window.DOMParser().parseFromString(data.contents, "text/xml");
  }
  