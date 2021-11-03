// 歌曲库：带有歌曲 URL 的数组
var songs = [
    "./music/单车_陈奕迅.mp3",
    "./music/光年之外_邓紫棋.mp3",
    "./music/来自天堂的魔鬼_邓紫棋.mp3",
    "./music/说好不哭_周杰伦.mp3",
    "./music/一生中最爱_陈奕迅.mp3",
    "./music/Someday I'll Fly_邓紫棋.mp3",
    "./music/千千阙歌_陈慧娴.mp3",
    "./music/我一定会爱上你_谢春花.mp3"
];

var e = window.event;
var currentSong = 0; // 当前歌曲
var audio = document.getElementById("audio");
var screen = document.getElementById("screen");
var tiempo = document.getElementById("tiempo");
var lista = document.getElementById("list");
var botonExpand = document.getElementById("botonExpand");


// 全局函数 
cargar();
rellenarLista();

// 事件监听
audio.addEventListener("ended", next, false); // 当前歌曲结束时继续下一首曲目
lista.addEventListener("click", playListItem, false); // 通过单击加载和播放列表中选定的歌曲



// 函数定义
function rellenarLista() {
    for (i in songs) {
        li = document.createElement("li");
        li.setAttribute("id", i);
        li.textContent = limpiarNombre(songs[i]);
        lista.appendChild(li);
    }
}

function expandirLista() {
    lista.classList.toggle("expand");
    botonLista.classList.toggle("expand");

}

function limpiarNombre(texto) {
    var nombre = decodeURIComponent(texto);
    var pos = nombre.lastIndexOf("/");
    var nombre = nombre.substring(pos + 1);
    return nombre;
    // return nombre.replace(".mp3", ""); 
}

function playListItem(e) {
    selected = e.target;
    currentSong = selected.getAttribute("id");
    cargar();
    play();
}

function selectedEnLista() {
    for (i in lista.children) {
        if (lista.children.item(i).getAttribute("id") == currentSong) {
            lista.children.item(i).classList.add("selected");
        } else {
            lista.children.item(i).classList.remove("selected");
        }
    }
}

// 歌曲库切换
function cargar() {
    audio.src = songs[currentSong];
}

// 播放
function play() {
    audio.play();
    mostrar();
    if (!lista.classList.contains("expand")) {
        expandirLista();
    }
    selectedEnLista()
}

// 停止
function stop() {
    audio.pause();
    audio.currentTime = 0;
}

// 显示歌曲信息
function mostrar() {
    screen.textContent = limpiarNombre(songs[currentSong]);
}

// 暂停
function pause() {
    audio.pause();
    console.log(audio.played)
}

// 下一首
function next() {
    if (currentSong == songs.length - 1) {
        currentSong = 0;
    } else {
        currentSong++;
    }
    cargar();
    play();
}

// 上一首
function prev() {
    if (currentSong == 0) {
        currentSong = songs.length - 1;
    } else {
        currentSong--;
    }
    cargar();
    play();
}