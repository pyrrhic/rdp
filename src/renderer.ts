interface MainApi {
    getSources: () => Promise<Electron.DesktopCapturerSource[]>;
    setSource: (id: string) => Promise<void>;
}

// @ts-ignore
const api = window.mainApi as MainApi;

async function setupSourceSelect(sources: Electron.DesktopCapturerSource[]) {
    // const sourceSelect = document.getElementById("source-select") as HTMLSelectElement;
    //
    // for (let source of sources) {
    //     const newOption = document.createElement("option");
    //     newOption.value = source.id;
    //     newOption.innerText = source.name;
    //
    //     sourceSelect.add(newOption);
    // }
    //
    // sourceSelect.addEventListener("change", async (event) => {
    //     const selectEl = event.target as HTMLSelectElement;
    //     const selectedOption = selectEl.selectedOptions[0];
    //     const selectedValue = selectedOption.value;
    //     await api.setSource(selectedValue);
    //     await display();
    // });

    const sourcesDiv = document.getElementById("sources") as HTMLDivElement;

    // https://github.com/electron/electron/issues/42607 - thumbnails broken
    for (let source of sources) {
        const videoElement = document.createElement("video");
        // videoElement.setAttribute("width", "400");
        // videoElement.setAttribute("height", "400");
        videoElement.setAttribute("autoplay", "");
        videoElement.classList.add("hover:cursor-pointer", "object-fill");
        await api.setSource(source.id);
        const stream = await navigator.mediaDevices.getDisplayMedia({audio: false, video: { frameRate: 30, deviceId: source.id }});
        videoElement.srcObject = stream;

        const divElement = document.createElement("div");
        divElement.append(videoElement);
        divElement.id = source.name;
        // newDiv.setAttribute("data-source-id", source.id);
        divElement.addEventListener("click", async (event) => {
            await api.setSource(source.id);
            await displayMain();
        });
        divElement.classList.add("bg-black", "mt-4", "border-2", "rounded");

        const screenNameDiv = document.createElement("div");
        screenNameDiv.innerText = source.name;
        screenNameDiv.classList.add("bg-white", "text-lg", "text-center");

        divElement.append(screenNameDiv);

        sourcesDiv.append(divElement);
    }
}

async function displayMain() {
    const stream = await navigator.mediaDevices.getDisplayMedia({audio: false, video: { frameRate: 60 }});
    const videoElement = document.getElementById("video") as HTMLVideoElement;
    videoElement.srcObject = stream;
}

// async function displayFps() {
//     const videoElement = document.getElementById("video") as HTMLVideoElement;
//     const stream = videoElement.srcObject as MediaStream;
//     const videoTrack = stream.getVideoTracks()[0];
//     const framerateDisplay = document.getElementById("fps") as HTMLDivElement;
//
//     setInterval(() => {
//         const updatedSettings = videoTrack.getSettings();
//         if (updatedSettings.frameRate) {
//             framerateDisplay.textContent = `Framerate: ${updatedSettings.frameRate} FPS`;
//         } else {
//             framerateDisplay.textContent = 'Framerate: Not available';
//         }
//     }, 1000);
// }

async function init() {
    const sources = await api.getSources();
    await setupSourceSelect(sources);
    await api.setSource(sources[0].id);
    await displayMain();
    // await displayFps();
}

init();
