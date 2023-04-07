import EasySpeech from 'https://cdn.jsdelivr.net/npm/easy-speech/+esm'
let isEasySpeechInit = false;
export default async function textToVoice(text) {
    if(!EasySpeech.detect()) {
        return;
    }
    try {
        if(isEasySpeechInit === false) {
            await EasySpeech.init({maxTimeout: 5000, interval: 250});
            isEasySpeechInit = true;
        }
        await EasySpeech.speak({
            text: text,
            //voice: myLangVoice, // optional, will use a default or fallback
            pitch: 1,
            rate: 1,
            volume: 1,
            // there are more events, see the API for supported events
            boundary: e => console.debug('boundary reached')
          })
    }
    catch(err) {
        console.error(`textToVoice js`, err);
    }
}