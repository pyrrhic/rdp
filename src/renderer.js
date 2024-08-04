"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
// @ts-ignore
var api = window.mainApi;
function setupSourceSelect(sources) {
    return __awaiter(this, void 0, void 0, function () {
        var sourcesDiv, _loop_1, _i, sources_1, source;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    sourcesDiv = document.getElementById("sources");
                    _loop_1 = function (source) {
                        var videoElement, stream, divElement, screenNameDiv;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    videoElement = document.createElement("video");
                                    // videoElement.setAttribute("width", "400");
                                    // videoElement.setAttribute("height", "400");
                                    videoElement.setAttribute("autoplay", "");
                                    videoElement.classList.add("hover:cursor-pointer", "object-fill");
                                    return [4 /*yield*/, api.setSource(source.id)];
                                case 1:
                                    _b.sent();
                                    return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia({ audio: false, video: { frameRate: 30, deviceId: source.id } })];
                                case 2:
                                    stream = _b.sent();
                                    videoElement.srcObject = stream;
                                    divElement = document.createElement("div");
                                    divElement.append(videoElement);
                                    divElement.id = source.name;
                                    // newDiv.setAttribute("data-source-id", source.id);
                                    divElement.addEventListener("click", function (event) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            switch (_a.label) {
                                                case 0: return [4 /*yield*/, api.setSource(source.id)];
                                                case 1:
                                                    _a.sent();
                                                    return [4 /*yield*/, displayMain()];
                                                case 2:
                                                    _a.sent();
                                                    return [2 /*return*/];
                                            }
                                        });
                                    }); });
                                    divElement.classList.add("bg-black", "mt-4", "border-2", "rounded");
                                    screenNameDiv = document.createElement("div");
                                    screenNameDiv.innerText = source.name;
                                    screenNameDiv.classList.add("bg-white", "text-lg", "text-center");
                                    divElement.append(screenNameDiv);
                                    sourcesDiv.append(divElement);
                                    return [2 /*return*/];
                            }
                        });
                    };
                    _i = 0, sources_1 = sources;
                    _a.label = 1;
                case 1:
                    if (!(_i < sources_1.length)) return [3 /*break*/, 4];
                    source = sources_1[_i];
                    return [5 /*yield**/, _loop_1(source)];
                case 2:
                    _a.sent();
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function displayMain() {
    return __awaiter(this, void 0, void 0, function () {
        var stream, videoElement;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia({ audio: false, video: { frameRate: 60 } })];
                case 1:
                    stream = _a.sent();
                    videoElement = document.getElementById("video");
                    videoElement.srcObject = stream;
                    return [2 /*return*/];
            }
        });
    });
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
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var sources;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, api.getSources()];
                case 1:
                    sources = _a.sent();
                    return [4 /*yield*/, setupSourceSelect(sources)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, api.setSource(sources[0].id)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, displayMain()];
                case 4:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
init();
//# sourceMappingURL=renderer.js.map