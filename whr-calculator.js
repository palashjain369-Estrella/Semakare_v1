document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate-btn');
    const waistInput = document.getElementById('waist-input');
    const hipInput = document.getElementById('hip-input');
    const resultDisplay = document.getElementById('whr-result');
    const errorMessage = document.getElementById('error-message');
    
    const statusLow = document.getElementById('status-low');
    const statusModerate = document.getElementById('status-moderate');
    const statusHigh = document.getElementById('status-high');
    
    // Select the radio buttons
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    
    function resetStatus() {
        // Reset all to faded gray
        [statusLow, statusModerate, statusHigh].forEach(el => {
            el.className = 'h-full w-1/3 bg-surface-container-highest transition-colors duration-500 flex items-center justify-center text-[10px] font-bold text-on-surface opacity-50';
        });
    }

    function setStatus(level) {
        resetStatus();
        if (level === 'LOW') {
            statusLow.className = 'h-full w-1/3 bg-secondary flex items-center justify-center text-[10px] font-bold text-on-secondary opacity-100 transition-colors duration-500';
        } else if (level === 'MODERATE') {
            statusModerate.className = 'h-full w-1/3 bg-[#FFCC00] flex items-center justify-center text-[10px] font-bold text-on-surface opacity-100 transition-colors duration-500';
        } else if (level === 'HIGH') {
            statusHigh.className = 'h-full w-1/3 bg-error flex items-center justify-center text-[10px] font-bold text-on-error opacity-100 transition-colors duration-500';
        }
    }

    calculateBtn.addEventListener('click', () => {
        const waist = parseFloat(waistInput.value);
        const hip = parseFloat(hipInput.value);
        
        // Find selected gender
        let gender = 'male';
        for (const rb of genderRadios) {
            if (rb.checked) {
                gender = rb.value;
                break;
            }
        }

        // Validate
        if (isNaN(waist) || isNaN(hip) || waist <= 0 || hip <= 0) {
            errorMessage.classList.remove('hidden');
            resultDisplay.textContent = '0.00';
            resetStatus();
            return;
        }

        errorMessage.classList.add('hidden');
        
        // Calculate WHR
        const whr = waist / hip;
        
        // Animate result
        resultDisplay.textContent = whr.toFixed(2);
        resultDisplay.classList.add('scale-110', 'text-primary');
        setTimeout(() => {
            resultDisplay.classList.remove('scale-110', 'text-primary');
        }, 300);

        // Determine Status based on WHO thresholds
        let status = 'LOW';
        if (gender === 'male') {
            if (whr >= 0.90 && whr <= 1.0) status = 'MODERATE';
            else if (whr > 1.0) status = 'HIGH';
        } else { // female
            if (whr >= 0.80 && whr <= 0.85) status = 'MODERATE';
            else if (whr > 0.85) status = 'HIGH';
        }

        setStatus(status);
    });
});
