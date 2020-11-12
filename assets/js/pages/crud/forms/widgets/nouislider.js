// Class definition
const KTnoUiSliderDemos = (function () {
  // Private functions

  const demo1 = function () {
    // init slider
    const slider = document.getElementById('kt_nouislider_1');

    noUiSlider.create(slider, {
      start: [0],
      step: 2,
      range: {
        min: [0],
        max: [10],
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    // init slider input
    const sliderInput = document.getElementById('kt_nouislider_1_input');

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function () {
      slider.noUiSlider.set(this.value);
    });
  };

  const demo2 = function () {
    // init slider
    const slider = document.getElementById('kt_nouislider_2');

    noUiSlider.create(slider, {
      start: [20000],
      connect: [true, false],
      step: 1000,
      range: {
        min: [20000],
        max: [80000],
      },
      format: wNumb({
        decimals: 3,
        thousand: '.',
        postfix: ' (US $)',
      }),
    });

    // init slider input
    const sliderInput = document.getElementById('kt_nouislider_2_input');

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function () {
      slider.noUiSlider.set(this.value);
    });
  };

  const demo3 = function () {
    // init slider
    const slider = document.getElementById('kt_nouislider_3');

    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      direction: 'rtl',
      tooltips: [true, wNumb({ decimals: 1 })],
      range: {
        min: [0],
        '10%': [10, 10],
        '50%': [80, 50],
        '80%': 150,
        max: 200,
      },
    });

    // init slider input
    const sliderInput0 = document.getElementById('kt_nouislider_3_input');
    const sliderInput1 = document.getElementById('kt_nouislider_3.1_input');
    const sliderInputs = [sliderInput1, sliderInput0];

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInputs[handle].value = values[handle];
    });
  };

  const demo4 = function () {
    const slider = document.getElementById('kt_nouislider_input_select');

    // Append the option elements
    for (let i = -20; i <= 40; i++) {
      const option = document.createElement('option');
      option.text = i;
      option.value = i;

      slider.appendChild(option);
    }

    // init slider
    const html5Slider = document.getElementById('kt_nouislider_4');

    noUiSlider.create(html5Slider, {
      start: [10, 30],
      connect: true,
      range: {
        min: -20,
        max: 40,
      },
    });

    // init slider input
    const inputNumber = document.getElementById('kt_nouislider_input_number');

    html5Slider.noUiSlider.on('update', function (values, handle) {
      const value = values[handle];

      if (handle) {
        inputNumber.value = value;
      } else {
        slider.value = Math.round(value);
      }
    });

    slider.addEventListener('change', function () {
      html5Slider.noUiSlider.set([this.value, null]);
    });

    inputNumber.addEventListener('change', function () {
      html5Slider.noUiSlider.set([null, this.value]);
    });
  };

  const demo5 = function () {
    // init slider
    const slider = document.getElementById('kt_nouislider_5');

    noUiSlider.create(slider, {
      start: 20,
      range: {
        min: 0,
        max: 100,
      },
      pips: {
        mode: 'values',
        values: [20, 80],
        density: 4,
      },
    });

    const sliderInput = document.getElementById('kt_nouislider_5_input');

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function () {
      slider.noUiSlider.set(this.value);
    });

    slider.noUiSlider.on('change', function (values, handle) {
      if (values[handle] < 20) {
        slider.noUiSlider.set(20);
      } else if (values[handle] > 80) {
        slider.noUiSlider.set(80);
      }
    });
  };

  const demo6 = function () {
    // init slider

    const verticalSlider = document.getElementById('kt_nouislider_6');

    noUiSlider.create(verticalSlider, {
      start: 40,
      orientation: 'vertical',
      range: {
        min: 0,
        max: 100,
      },
    });

    // init slider input
    const sliderInput = document.getElementById('kt_nouislider_6_input');

    verticalSlider.noUiSlider.on('update', function (values, handle) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function () {
      verticalSlider.noUiSlider.set(this.value);
    });
  };

  const demo7 = function () {
    // init slider
    const slider = document.getElementById('kt_nouislider_7');

    noUiSlider.create(slider, {
      start: [40, 60],
      connect: true,
      range: {
        min: 0,
        max: 100,
      },
      format: wNumb({
        decimals: 2,
        postfix: ' ($)',
      }),
    });

    // init slider input
    const sliderInput0 = document.getElementById('kt_nouislider_7_input');
    const sliderInput1 = document.getElementById('kt_nouislider_7.1_input');
    const sliderInputs = [sliderInput0, sliderInput1];

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInputs[handle].value = values[handle];
    });
  };

  // Modal demo

  const modaldemo1 = function () {
    const slider = document.getElementById('kt_nouislider_modal1');

    noUiSlider.create(slider, {
      start: [0],
      step: 2,
      range: {
        min: [0],
        max: [10],
      },
      format: wNumb({
        decimals: 0,
      }),
    });

    // init slider input
    const sliderInput = document.getElementById('kt_nouislider_modal1_input');

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function () {
      slider.noUiSlider.set(this.value);
    });
  };

  const modaldemo2 = function () {
    const slider = document.getElementById('kt_nouislider_modal2');

    noUiSlider.create(slider, {
      start: [20000],
      connect: [true, false],
      step: 1000,
      range: {
        min: [20000],
        max: [80000],
      },
      format: wNumb({
        decimals: 3,
        thousand: '.',
        postfix: ' (US $)',
      }),
    });

    // init slider input
    const sliderInput = document.getElementById('kt_nouislider_modal2_input');

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInput.value = values[handle];
    });

    sliderInput.addEventListener('change', function () {
      slider.noUiSlider.set(this.value);
    });
  };

  const modaldemo3 = function () {
    const slider = document.getElementById('kt_nouislider_modal3');

    noUiSlider.create(slider, {
      start: [20, 80],
      connect: true,
      direction: 'rtl',
      tooltips: [true, wNumb({ decimals: 1 })],
      range: {
        min: [0],
        '10%': [10, 10],
        '50%': [80, 50],
        '80%': 150,
        max: 200,
      },
    });

    // init slider input
    const sliderInput0 = document.getElementById(
      'kt_nouislider_modal1.1_input'
    );
    const sliderInput1 = document.getElementById(
      'kt_nouislider_modal1.2_input'
    );
    const sliderInputs = [sliderInput1, sliderInput0];

    slider.noUiSlider.on('update', function (values, handle) {
      sliderInputs[handle].value = values[handle];
    });
  };
  return {
    // public functions
    init: function () {
      demo1();
      demo2();
      demo3();
      //   demo4();
      //   demo5();
      //   demo6();
      //   demo7();
      //   modaldemo1();
      //   modaldemo2();
      //   modaldemo3();
    },
  };
})();

jQuery(document).ready(function () {
  KTnoUiSliderDemos.init();
});
