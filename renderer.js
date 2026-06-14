const list = document.getElementById("videoList");
const player = document.getElementById("player");

const videos = [
"Kid gets caught on the hub in class.mp4"
];

videos.forEach(video => {
const li = document.createElement("li");

li.textContent = video;

li.addEventListener("click", () => {
player.src = `videos/${encodeURIComponent(video)}`;
player.play();
});

list.appendChild(li);
});

player.src = `videos/${encodeURIComponent(videos[0])}`;
