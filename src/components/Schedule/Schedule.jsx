import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Clock } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/navigation';
import { format, addDays, startOfMonth, endOfMonth, isSameDay } from 'date-fns';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from '../../lib/config';

const baseUrl = `${API_BASE_URL}/api/v2/hianime`;

const ScheduleComponent = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showingDate, setShowingDate] = useState(new Date());
    const [scheduleData, setScheduleData] = useState([]);
    const [currentTime, setCurrentTime] = useState(new Date());
    const swiperRef = useRef(null);

    const fetchSchedule = async (date) => {
        try {
            const response = await fetch(`${baseUrl}/schedule?date=${format(date, 'yyyy-MM-dd')}`);
            if (!response.ok) throw new Error('Failed to fetch data');
            const result = await response.json();
            setScheduleData(result.data.scheduledAnimes);
        } catch (error) {
            console.error('Error fetching schedule data:', error);
        }
    };

    useEffect(() => {
        fetchSchedule(selectedDate);
    }, [selectedDate]);

    useEffect(() => {
        // Update time every second
        const timer = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format timezone offset
    const formatTimezoneOffset = () => {
        const offset = -currentTime.getTimezoneOffset();
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset >= 0 ? '+' : '-';
        return `GMT${sign}${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    };

    // Generate dates for the current month
    const monthStart = startOfMonth(showingDate);
    const monthEnd = endOfMonth(showingDate);
    const dates = [];
    let currentDate = monthStart;

    while (currentDate <= monthEnd) {
        dates.push(currentDate);
        currentDate = addDays(currentDate, 1);
    }

    // Find today's date index
    const todayIndex = dates.findIndex(date => isSameDay(date, new Date()));

    return (
        <div className="lg:w-3/4 p-6 bg-transparent text-white">
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl text-blue-500 font-medium">Estimated Schedule</span>
                    <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                            ({formatTimezoneOffset()}) {format(currentTime, 'MM/dd/yyyy hh:mm:ss a')}
                        </span>
                    </div>
                </div>

                <Swiper
                    ref={swiperRef}
                    modules={[Navigation]}
                    slidesPerView={7}
                    spaceBetween={8}
                    className="w-full"
                    navigation={true}
                    initialSlide={todayIndex}
                    breakpoints={{
                        320: {
                            slidesPerView: 3,
                            spaceBetween: 8,
                        },
                        768: {
                            slidesPerView: 4,
                            spaceBetween: 8,
                        },
                        1024: {
                            slidesPerView: 5,
                            spaceBetween: 8,
                        },
                        1280: {
                            slidesPerView: 6,
                            spaceBetween: 8,
                        },
                        1536: {
                            slidesPerView: 7,
                            spaceBetween: 8,
                        },
                    }}
                >
                    {dates.map((date) => (
                        <SwiperSlide key={date.toString()}>
                            <button
                                onClick={() => setSelectedDate(date)}
                                className={`w-full p-4 rounded-lg transition-colors ${format(date, 'MMM dd') === format(selectedDate, 'MMM dd')
                                        ? 'bg-blue-200 text-gray-900'
                                        : 'bg-gray-800 hover:bg-gray-700'
                                    }`}
                            >
                                <div className="text-sm font-medium">
                                    {format(date, 'EEE')}
                                </div>
                                <div className="text-xs opacity-75">
                                    {format(date, 'MMM dd')}
                                </div>
                            </button>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="space-y-2">
                {scheduleData.map((item, index) => (
                    <Link to={`/anime/${item.id}`} key={item.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                        <div className="flex items-center gap-4">
                            <span className="text-gray-400">{item.time}</span>
                            <span className="font-medium text-blue-400">{item.name}</span>
                        </div>
                        <span className="text-sm text-gray-400">{item.episode}</span>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default ScheduleComponent;