import { useEffect, useRef, useState } from "react";
import { createChart, CandlestickSeries } from "lightweight-charts";
import Setting from "./Setting";
import { useThemeStore } from "../store/useThemeStore";


// npm install --save lightweight-charts


const Chart = () => {
    const chartRef = useRef();
    const [ohlcData, setOhlcData] = useState(null);
    const [isSettingOpen, setIsSettingOpen] = useState(false);
    const { theme } = useThemeStore(); // 테마 가져오기
    const upColor = '#26a69a';
    const downColor = '#ef5350';

    //  chart 전체 스타일에 대한 속성 (e.g 수평선, 수직선, 가로세로 text 등)
    useEffect(() => {
        const chart = createChart(chartRef.current, {
            width: chartRef.current.clientWidth,
            height: 400,
            layout: {
                background: { color: theme === 'dark' ? '#1e1e1e' : '#ffffff' },
                textColor: theme === 'dark' ? '#ffffff' : '#000000',
                attributionLogo: false,
            },
            grid: {
                vertLines: {
                    color: theme === 'dark' ? '#444' : '#eee',
                    style: 2 // 2 = Dashed
                },
                horzLines: {
                    color: theme === 'dark' ? '#444' : '#eee',
                    style: 2
                },
            },
            timeScale: {
                timeVisible: true,
                secondsVisible: false,
            },
        });

        //  chart 내부 데이터에 대한 속성
        const candlestickSeries = chart.addSeries(CandlestickSeries, {
            upColor,
            downColor,
            priceFormat: {
                type: 'price',
                precision: 4,
                minMove: 0.0001
            },
        });

        //데이터들 (백엔드에서 비동기로 받아와서 store로 저장하고 전파하면 될듯)
        const data = [
            { time: '2025-06-01', open: 0.1121, high: 0.1186, low: 0.0887, close: 0.1134 },
            { time: '2025-06-02', open: 0.1134, high: 0.1287, low: 0.1088, close: 0.1287 },
            { time: '2025-06-03', open: 0.1287, high: 0.1287, low: 0.1105, close: 0.1200 },
            { time: '2025-06-04', open: 0.1200, high: 0.1250, low: 0.1165, close: 0.1173 },
            { time: '2025-06-05', open: 0.1173, high: 0.1198, low: 0.1100, close: 0.1147 },
            { time: '2025-06-06', open: 0.1147, high: 0.1170, low: 0.1048, close: 0.1093 },
            { time: '2025-06-07', open: 0.1093, high: 0.1101, low: 0.0900, close: 0.0987 },
            { time: '2025-06-08', open: 0.0987, high: 0.1029, low: 0.0937, close: 0.0951 },
            { time: '2025-06-09', open: 0.0951, high: 0.1190, low: 0.0900, close: 0.1038 },
            { time: '2025-06-10', open: 0.1038, high: 0.1100, low: 0.0975, close: 0.1050 },
            { time: '2025-06-11', open: 0.1050, high: 0.1150, low: 0.1041, close: 0.1077 },
            { time: '2025-06-12', open: 0.1077, high: 0.1082, low: 0.0996, close: 0.1020 },
        ];

        // 데이터 넣기
        candlestickSeries.setData(data);

        // 차트 왼쪽으로 정렬
        chart.timeScale().applyOptions({
            rightOffset: 3,
        });
        chart.timeScale().fitContent();


        chart.subscribeCrosshairMove((param) => {
            if (!param || !param.time || !param.seriesData) {
                setOhlcData(null);
                return;
            }
            const d = param.seriesData.get(candlestickSeries);

            // 가격 표시 display (얘도 마지막 데이터 store로 남기면 될듯)
            if (d) {
                setOhlcData({
                    open: d.open,
                    high: d.high,
                    low: d.low,
                    close: d.close,
                });
            }
        });

        return () => chart.remove();
    }, [theme]);

    const getGreenNRedColor = () => {
        return ohlcData.close >= ohlcData.open ? upColor : downColor;
    };

    const getBlackNWhiteColor = () => {
        return {
            color: theme === 'dark' ? '#fff' : '#000',
        };
    };



    return (
        <div className="relative w-full">
            {/* 상단 좌측 가격 표시 display 영역 */}
            <div className="absolute top-2 left-2 bg-transparent flex gap-[10px] text-sm z-10 font-mono items-center"
                style={getBlackNWhiteColor()}
            >
                <button
                    className="px-1.5 py-2 bg-gray-200 rounded text-xs font-bold"
                    onClick={() => setIsSettingOpen(true)}
                >설정</button>
                {ohlcData && (
                    <div className="flex flex gap-[10px]"
                        style={{ color: getGreenNRedColor() }}
                    >
                        <div><span style={getBlackNWhiteColor()}>O:</span>{ohlcData.open.toFixed(4)}</div>
                        <div><span style={getBlackNWhiteColor()}>H:</span>{ohlcData.high.toFixed(4)}</div>
                        <div><span style={getBlackNWhiteColor()}>L:</span>{ohlcData.low.toFixed(4)}</div>
                        <div><span style={getBlackNWhiteColor()}>C:</span>{ohlcData.close.toFixed(4)}</div>
                    </div>
                )}
            </div>


            {/* 차트 */}
            <div ref={chartRef} style={{ width: "100%", height: 400 }} />

            {/* 설정 모달 */}
            {isSettingOpen && <Setting onClose={() => setIsSettingOpen(false)} />}
        </div>
    );
};

export default Chart;
