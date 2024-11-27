


new slider({
    el : document.querySelector('#sliders'),
    slideClass : 'slider',
    currentSlider : (slider) => {
        console.log(slider);
    },
    auto : 1000
});

new slider({
    el : document.querySelector('#sliders2'),
    slideClass : 'slider',
    currentSlider : (slider) => {
        console.log(slider);
    },
    auto : 3000
});