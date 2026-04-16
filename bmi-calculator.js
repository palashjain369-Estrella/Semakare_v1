document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const heightInput = document.getElementById('height-input');
    const weightInput = document.getElementById('weight-input');
    const bmiResultContainer = document.getElementById('bmi-result-container');
    const bmiResult = document.getElementById('bmi-result');
    const errorMessage = document.getElementById('error-message');
    
    // Scale sections
    const scaleUnderweight = document.getElementById('scale-underweight');
    const scaleNormal = document.getElementById('scale-normal');
    const scaleOverweight = document.getElementById('scale-overweight');
    const scaleObese = document.getElementById('scale-obese');

    function resetScale() {
        [scaleUnderweight, scaleNormal, scaleOverweight, scaleObese].forEach(el => {
            el.style.opacity = '0.3';
        });
    }

    function highlightScale(bmi) {
        resetScale();
        if (bmi < 18.5) {
            scaleUnderweight.style.opacity = '1';
        } else if (bmi >= 18.5 && bmi < 25.0) {
            scaleNormal.style.opacity = '1';
        } else if (bmi >= 25.0 && bmi < 30.0) {
            scaleOverweight.style.opacity = '1';
        } else if (bmi >= 30.0) {
            scaleObese.style.opacity = '1';
        }
    }

    calculateBtn.addEventListener('click', () => {
        const heightCm = parseFloat(heightInput.value);
        const weightKg = parseFloat(weightInput.value);

        // Validate
        if (isNaN(heightCm) || isNaN(weightKg) || heightCm <= 0 || weightKg <= 0) {
            errorMessage.classList.remove('hidden');
            bmiResultContainer.classList.add('hidden');
            resetScale();
            return;
        }

        errorMessage.classList.add('hidden');
        
        // Calculate BMI
        const heightM = heightCm / 100;
        const bmi = weightKg / (heightM * heightM);
        
        // Display result
        bmiResult.textContent = bmi.toFixed(1);
        bmiResultContainer.classList.remove('hidden');
        
        // Animate pop
        bmiResult.classList.add('scale-110');
        setTimeout(() => {
            bmiResult.classList.remove('scale-110');
        }, 300);

        // Highlight right class group
        highlightScale(bmi);
    });

    // Initialize
    resetScale();
});
