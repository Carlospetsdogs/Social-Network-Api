// Function to add date suffix
const addDateSuffix = (date) => {
    const dateStr = date.toString();
    const lastChar = dateStr.charAt(dateStr.length - 1);
  
    if (lastChar === '1' && dateStr !== '11') return `${dateStr}st`;
    if (lastChar === '2' && dateStr !== '12') return `${dateStr}nd`;
    if (lastChar === '3' && dateStr !== '13') return `${dateStr}rd`;
    return `${dateStr}th`;
  };
  
  // Function to format a timestamp
  module.exports = (timestamp, { monthLength = 'short', dateSuffix = true } = {}) => {
    const months = [
      monthLength === 'short' ? 'Jan' : 'January',
      monthLength === 'short' ? 'Feb' : 'February',
      monthLength === 'short' ? 'Mar' : 'March',
      monthLength === 'short' ? 'Apr' : 'April',
      monthLength === 'short' ? 'May' :  'May',
      monthLength === 'short' ? 'Jun' : 'June',
      monthLength === 'short' ? 'Jul' : 'July',
      monthLength === 'short' ? 'Aug' : 'August',
      monthLength === 'short' ? 'Sep' : 'September',
      monthLength === 'short' ? 'Oct' : 'October',
      monthLength === 'short' ? 'Nov' : 'November',
      monthLength === 'short' ? 'Dec' : 'December',
    ];
  
    const dateObj = new Date(timestamp);
    const formattedMonth = months[dateObj.getMonth()];
    const dayOfMonth = dateSuffix ? addDateSuffix(dateObj.getDate()) : dateObj.getDate();
    const year = dateObj.getFullYear();
    let hour = dateObj.getHours() % 12 || 12;
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');
    const periodOfDay = dateObj.getHours() >= 12 ? 'pm' : 'am';
  
    return `${formattedMonth} ${dayOfMonth}, ${year} at ${hour}:${minutes} ${periodOfDay}`;
  };
  