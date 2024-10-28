import '@vidstack/react/player/styles/base.css';
import '@vidstack/react/player/styles/plyr/theme.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { PlyrLayout, plyrLayoutIcons } from '@vidstack/react/player/layouts/plyr';
import { Track } from "@vidstack/react";

const Vidstack = () => {
    return (
        <>
            <div>
                <MediaPlayer title="Sprite Fight" src="https://mmd.biananset.net/_v7/cd914ffc0cb17d4af1017fa6c1a9cd6d4db33887d1f03f2af365496646f8dfc442c671a686d1b459eb0ffe7b4b795eee172a232f946a2d93b3d5f0873c3137bbf632cfcb0602e96f3ad6ab9187dcb737b5449ba9ef6b2d870c3c4beadc4e0aac13d8d2b165de94c873794b42136609bf22e530c3887d0e336be062f224eb7e29/master.m3u8">
                    <MediaProvider />
                    <Track
                        src="https://s.megastatics.com/subtitle/dc13e106ce815098ee70a00760ea916d/eng-2.vtt"
                        kind="subtitles"
                        label="English"
                        lang="en-US"
                        default
                    />
                    <PlyrLayout thumbnails="https://s.megastatics.com/subtitle/dc13e106ce815098ee70a00760ea916d/eng-2.vtt" icons={plyrLayoutIcons} />
                </MediaPlayer>
            </div>
        </>
    );
};

export default Vidstack;