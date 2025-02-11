// date.js
const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday','Sunday'];

function getCurrentDayET() {
    const options = { timeZone: 'America/New_York', weekday: 'long' };
    const currentDayET = new Date().toLocaleDateString('en-US', options);
    return currentDayET;
}

function isDateOrderable(dayToCheck) {
    const currentDayET = getCurrentDayET();
    const currentDayIndex = daysOfWeek.indexOf(currentDayET);
    const checkDayIndex = daysOfWeek.indexOf(dayToCheck);
    
    // If the day to check is today or earlier, it's not orderable
    if (checkDayIndex === currentDayIndex) {
        return false; // Can't order for today
    }
    
    // If we're checking a day earlier in the week than today
    if (checkDayIndex < currentDayIndex) {
        return false;
    }
    
    // Allow all future days in the current week
    return true;
}

function updateMenuButtonStates() {
    const menuCards = document.querySelectorAll('.daily-menu');
    const currentDay = getCurrentDayET();
    
    menuCards.forEach(card => {
        const dayBadge = card.querySelector('.menu-badge');
        const day = dayBadge.textContent;
        const orderButton = card.querySelector('.btn-primary');
        
        if (!isDateOrderable(day)) {
            // Disable past days
            orderButton.disabled = true;
            orderButton.classList.remove('btn-primary');
            orderButton.classList.add('btn-secondary');
            orderButton.innerHTML = `Orders Closed for ${day}`;
        } else {
            // Make sure future days are enabled
            orderButton.disabled = false;
            orderButton.classList.remove('btn-secondary');
            orderButton.classList.add('btn-primary');
            orderButton.innerHTML = `Order for ${day}`;
        }
    });
}

function handleDateCheck(day) {
    if (!isDateOrderable(day)) {
        alert("Sorry, orders are closed for " + day + ". Please order for an upcoming day.");
        return false;
    }
    return true;
}

// Initialize date checking when DOM loads
document.addEventListener('DOMContentLoaded', function() {
    updateMenuButtonStates();
    console.log("Current day (ET):", getCurrentDayET());
});

// Update status every minute
setInterval(updateMenuButtonStates, 60000);

// Export functions that need to be accessed by other files
window.handleDateCheck = handleDateCheck;
window.isDateOrderable = isDateOrderable;