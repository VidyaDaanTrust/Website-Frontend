import React, { useState, useEffect, useRef } from "react";
import './CarouselTray.css';

import nextOnButtonRightActive from '../../assets/Next-On-Button-right-active.svg';
import nextOnButtonRight from '../../assets/Next-On-Button-right.svg';

const CarouselTray = ({ items, renderCard, cardsPerViewConfig = { desktop: 2, mobile: 1 } }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isPrevHovered, setIsPrevHovered] = useState(false);
    const [isNextHovered, setIsNextHovered] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 980);

    const getCardsPerView = () => window.innerWidth <= 980 ? cardsPerViewConfig.mobile : cardsPerViewConfig.desktop;
    const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

    const peakWidth = 20;

    useEffect(() => {
        const handleResize = () => {
            setCardsPerView(getCardsPerView());
            setIsMobile(window.innerWidth <= 980);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [cardsPerViewConfig]);

    const maxIndex = Math.max(0, Math.ceil(items.length / cardsPerView) * cardsPerView);

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + cardsPerView >= maxIndex ? 0 : prev + cardsPerView));
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev <= 0 ? maxIndex - cardsPerView : prev - cardsPerView));
    };

    const gridRef = useRef(null);
    const [slideWidth, setSlideWidth] = useState(0);

    useEffect(() => {
        const calculateSlideWidth = () => {
            if (gridRef.current && !isMobile) {
                const gridWidth = gridRef.current.offsetWidth;
                const gap = 20;
                const totalGapWidth = gap * (cardsPerView - 1);
                const cardWidth = (gridWidth - totalGapWidth) / cardsPerView;
                setSlideWidth(cardWidth + (cardsPerView > 1 ? gap : 0));
            }
        };

        calculateSlideWidth();
        window.addEventListener('resize', calculateSlideWidth);
        return () => window.removeEventListener('resize', calculateSlideWidth);
    }, [cardsPerView, isMobile]);

    const isItemOverflown = (index) => {
        if (isMobile) return false; // No overflown items on mobile with scrolling
        const startVisibleIndex = currentIndex;
        const endVisibleIndex = currentIndex + cardsPerView - 1;
        return index < startVisibleIndex || index > endVisibleIndex;
    };

    return (
        <div className="carousel-tray">
            <div className="carousel-container">
                <div
                    className="carousel-grid"
                    ref={gridRef}
                    style={!isMobile ? {
                        transform: `translateX(${((peakWidth * (currentIndex + 1)) - currentIndex * slideWidth)}px)`
                    } : {}}
                >
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={`carousel-item ${isItemOverflown(index) ? 'carousel-item--overflown' : ''}`}
                            style={!isMobile ? {
                                flex: `0 0 calc(${(100 / cardsPerView)}% - ${(2 * peakWidth + 20 * (cardsPerView - 1)) / cardsPerView}px)`
                            } : {}}
                        >
                            {renderCard(item)}
                        </div>
                    ))}
                </div>
            </div>

            {!isMobile && (
                <div className="carousel-navigation">
                    <button
                        className="carousel-nav-button carousel-prev-nav"
                        onClick={handlePrev}
                        onMouseEnter={() => setIsPrevHovered(true)}
                        onMouseLeave={() => setIsPrevHovered(false)}
                        disabled={items.length <= cardsPerView}
                    >
                        <img
                            src={isPrevHovered ? nextOnButtonRightActive : nextOnButtonRight}
                            alt="Previous"
                        />
                    </button>
                    <button
                        className="carousel-nav-button carousel-next-nav"
                        onClick={handleNext}
                        onMouseEnter={() => setIsNextHovered(true)}
                        onMouseLeave={() => setIsNextHovered(false)}
                        disabled={items.length <= cardsPerView}
                    >
                        <img
                            src={isNextHovered ? nextOnButtonRightActive : nextOnButtonRight}
                            alt="Next"
                        />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CarouselTray;