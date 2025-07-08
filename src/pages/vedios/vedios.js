const API_KEY = "AIzaSyDENNH53cvTfoEJQ-40umQ4bceprXVp0O4";

const QUERY = "meditation OR mental health";
const MAX_RESULTS = 15;
const SHOW_COUNT = 6;

async function fetchVideos() {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${MAX_RESULTS}&q=${encodeURIComponent(QUERY)}&key=${API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.items || [];
}

function getRandomItems(arr, n) {
  let result = [];
  let taken = new Set();
  while (result.length < n && result.length < arr.length) {
    let idx = Math.floor(Math.random() * arr.length);
    if (!taken.has(idx)) {
      result.push(arr[idx]);
      taken.add(idx);
    }
  }
  return result;
}

function getRandomWidths(count, min, total) {
  let widths = Array(count).fill(min);
  let remaining = total - min * count;
  for (let i = 0; i < count - 1; i++) {
    let max = remaining - (count - i - 1) * 0;
    let w = Math.random() * max;
    w = Math.round(w * 100) / 100;
    widths[i] += w;
    remaining -= w;
  }
  widths[count - 1] += Math.round(remaining * 100) / 100;
  return widths;
}

function renderVideos(videos) {
  const container = document.getElementById("video-container");
  container.innerHTML = "";
  for (let i = 0; i < videos.length; i += 3) {
    const row = document.createElement("div");
    row.className = "video-row";
    const count = Math.min(3, videos.length - i);
    const widths = getRandomWidths(count, 2, 10);
    for (let j = 0; j < count; j++) {
      const videoId = videos[i + j].id.videoId;
      const div = document.createElement("div");
      div.className = "video";
      div.style.flex = `${widths[j]} 1 0`;
      div.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
      row.appendChild(div);
    }
    container.appendChild(row);
  }
}

fetchVideos()
  .then((videos) => {
    const randomVideos = getRandomItems(videos, SHOW_COUNT);
    renderVideos(randomVideos);
  })
  .catch((err) => {
    document.getElementById("video-container").innerHTML =
      '<p style="color:red">Failed to load videos. Check your API key and quota.</p>';
    console.error(err);
  });
