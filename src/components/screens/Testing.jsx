import React, { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';
import Hls from 'hls.js';

const VideoPlayer = ({ source, subtitle }) => {
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
                        time: 60, 
                        text: 'Highlight Segment',
                        color: 'purple', 
                    },
                    {
                        time: 120, 
                        text: 'End of Segment',
                    },
                ],
                subtitle: {
                    url: subtitle,
                    type: 'vtt', // Assuming the subtitle is in VTT format
                    style: {
                        color: '#fff', // Subtitle text color
                        fontSize: '20px', // Subtitle text size
                    },
                },
            });
        }
    }, [source, subtitle]);

    return <div ref={artRef} style={{ width: '100%', height: '500px' }} />;
};

export default VideoPlayer;