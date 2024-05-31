// JavaScript code for selecting a date
var selectedDate = null;

var calendarCells = document.querySelectorAll('.unavailable');
calendarCells.forEach(function(cell) {
  cell.addEventListener('click', function() {
    // Remove the 'selected' class from all cells
    calendarCells.forEach(function(cell) {
      cell.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked cell
    this.classList.add('selected');

    // Update the selectedDate variable
    selectedDate = this.innerText;

    // You can use the selectedDate value for further processing
    console.log('Selected date:', selectedDate);
  });
});
