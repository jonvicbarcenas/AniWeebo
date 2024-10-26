import React, { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

const VideoPlayer = ({ source }) => {
    const artRef = useRef(null);

    useEffect(() => {
        if (artRef.current) {
            const art = new Artplayer({
                container: artRef.current,
                url: source,
                type: 'm3u8',
                customType: {
                    m3u8: (video, url) => {
                        if (Hls.isSupported()) {
                            const hls = new Hls();
                            hls.loadSource(url);
                            hls.attachMedia(video);
                        } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
                            video.src = url;
                        }
                    },
                },
                autoplay: true,
                volume: 0.7,
                pip: true,
                autoOrientation: true,
                setting: true,
                playbackRate: true,
                theme: '#800080',
                highlight: [
                    {
                        time: 60, // Start time at 1:00
                        text: 'Highlight Segment',
                        color: 'purple', // Set the highlight color
                    },
                    {
                        time: 120, // End time at 2:00
                        text: 'End of Segment',
                    },
                ],
            });

            return () => {
                art.destroy();
            };
        }
    }, [source]);

    return <div ref={artRef} style={{ width: '100%', height: '500px' }} />;
};

export default VideoPlayer;
