const code = `\
import("stdfaust.lib");
process = _ <: dm.freeverb_demo;
`;

const ui = [{"type":"hgroup","label":"Freeverb","items":[{"type":"vgroup","label":"0x00","meta":[{"0":""}],"items":[{"type":"vslider","label":"Damp","shortname":"Damp","address":"/Freeverb/0x00/Damp","index":16,"meta":[{"0":""},{"style":"knob"},{"tooltip":"Somehow control the         density of the reverb."}],"init":0.5,"min":0,"max":1,"step":0.025},{"type":"vslider","label":"RoomSize","shortname":"RoomSize","address":"/Freeverb/0x00/RoomSize","index":8,"meta":[{"1":""},{"style":"knob"},{"tooltip":"The room size         between 0 and 1 with 1 for the largest room."}],"init":0.5,"min":0,"max":1,"step":0.025},{"type":"vslider","label":"Stereo Spread","shortname":"Stereo_Spread","address":"/Freeverb/0x00/Stereo_Spread","index":323848,"meta":[{"2":""},{"style":"knob"},{"tooltip":"Spatial         spread between 0 and 1 with 1 for maximum spread."}],"init":0.5,"min":0,"max":1,"step":0.01}]},{"type":"vslider","label":"Wet","shortname":"Wet","address":"/Freeverb/Wet","index":28,"meta":[{"1":""},{"tooltip":"The amount of reverb applied to the signal         between 0 and 1 with 1 for the maximum amount of reverb."}],"init":0.3333,"min":0,"max":1,"step":0.025}]}];

const msgSend = { type: "build", ui, name: "rev.dsp", code, poly: false };

/** @type {HTMLIFrameElement} */
const iframe = document.getElementById("gui-builder");

window.onmessage = (e) => {
    const { data } = e;
    if (!data) return;
    if (data.type === "export") {
        e.source.postMessage({ type: "exported", href: "http://localhost/FaustGuiBuilder/Front-End/test/binary.zip" }, "*")
        // e.source.postMessage({ type: "exported", href: "https://static.shren.site/wam/test/binary.zip" }, "*")
    }
};

iframe.onload = () => iframe.contentWindow.postMessage(msgSend, "*");

